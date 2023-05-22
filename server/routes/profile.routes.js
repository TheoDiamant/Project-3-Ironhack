const express = require("express");
const router = express.Router();
const mongoose = require('mongoose')
const { ObjectId } = require('mongodb');

const Product = require("../models/Products.model")
const User = require("../models/User.model")
const Offer = require("../models/Offer.model")
const Review = require("../models/Review.model")
const Follow = require("../models/Follow.model")

const { isAuthenticated } = require("../middleware/jwt.middleware.js");
const jwt = require("jsonwebtoken");

// Route to get the info on the profile page of the user
router.get("/member/:userId", isAuthenticated, (req, res, next) => {
  const { userId } = req.params

  User.findById(userId)
  .populate("review")
  .populate({
    path: "product",
    populate: {
      path: "user",
    },
  })
  .populate({
    path: "following",
    populate: {
      path: "userFollows",
      populate: {
        path: "product",
        populate: {
          path: "user",
        }
      }
    }
  })
  .populate({
    path: "like",
    populate: {
      path: "product",
    }
  })
  .then(response => {
    res.json(response)
  })

})

router.get("/member/:userId/edit", isAuthenticated, (req, res , next) => {

  const { userId } = req.payload._id 

  User.findById(userId)
  .then(response => {
    res.json(response)
  })

})

// Route to follow someone
router.post('/follow/:userId', isAuthenticated, (req, res, next) => {
  const userFollowed = req.params.userId;
  const userFollowing = req.payload._id;

  Follow.findOne({ user: userFollowing }) // Find the Follow document belonging to the user who is following
    .then(follow => {
      if (!follow) {
        // If it doesn't exist (first time following), create it
        return Follow.create({ user: userFollowing, userFollows: [userFollowed] })
          .then(createdFollow => {
            return User.findByIdAndUpdate(
              userFollowing,
              { $push: { following: createdFollow._id } },
              { new: true }
            );
          });
      } else {
        // If it already exists, add the new person being followed to the array
        follow.userFollows.push(userFollowed);
        return follow.save();
      }
    })
    .then(() => {
      // Then search the database for the Follow document belonging to the user being followed
      return Follow.findOne({ user: userFollowed });
    })
    .then(follow => {
      if (!follow) {
        // If it doesn't exist, create it and set "followers" to 1
        return Follow.create({ user: userFollowed, followers: 1 });
      } else {
        // If it already exists, update the follower count
        follow.followers += 1;
        return follow.save();
      }
    })
    .then(() => {
      res.json({ message: 'Follow added successfully.' });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Internal server error.' });
    });
});


router.delete('/follow/:userId/', isAuthenticated, (req, res, next) => {
  const userFollowed = req.params.userId;
  const userFollowing = req.payload._id;

  // Find and delete the follow document
  Follow.findOneAndDelete({ user: userFollowing, userFollows: userFollowed })
    .then(deletedFollow => {
      if (!deletedFollow) {
        // If the follow document doesn't exist, return an error
        return res.status(404).json({ message: 'Follow document not found.' });
      }

      // Find the follow document of the user being followed
      Follow.findOne({ user: userFollowed })
        .then(follow => {
          if (follow) {
            // If the follow document exists, decrement the followers count
            follow.followers -= 1;
            follow.save()
              .then(() => {
                res.json({ message: 'Unfollowed successfully.' });
              });
          } else {
            res.json({ message: 'Unfollowed successfully.' });
          }
        });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Internal server error.' });
    });
});


// Route to get 3 members info for previewing
router.get("/member-preview", (req, res, next) => {
  
  const { q } = req.query
  
  User.find({ name: {$regex: q, $options: "i" } })
  .then(users => {
    users = users.slice(0, 3) 
    res.json(users)
  })
  .catch(err => console.log(err))
})

module.exports = router;
