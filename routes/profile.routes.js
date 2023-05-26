const express = require("express");
const router = express.Router();

const User = require("../models/User.model")
const Review = require("../models/Review.model")
const Follow = require("../models/Follow.model")

const { isAuthenticated } = require("../middleware/jwt.middleware.js");
const jwt = require("jsonwebtoken");

// Route to get the info on the profile page of the user
router.get("/member/:userId", isAuthenticated, (req, res, next) => {
  const { userId } = req.params

  User.findById(userId)
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
    path: "review",
    populate: {
      path: "userReviewing",
    },
  })
  .populate({
    path: "product",
    populate: {
      path: "user",
    },
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

// Route to check if a user is following another
router.post("/follow-check", (req, res, next) => {

  const { user, userToCheck } = req.body

  Follow.findOne({user: user})
  .then((response) => {
    if(response.userFollows.includes(userToCheck)) {
      res.json({following: true})
    }
    else {
      res.json({following: false})
    }
  })
  .catch(err => res.json(err))
})


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

// Route to create a review
router.post("/create-review", (req, res, next) => {
  
  const { reviewText, userReviewing, userReviewed } = req.body
  
  Review.create({ reviewText, userReviewing })
  .then((createdReview) => {
    User.findById(userReviewed)
    .then((foundUser) => {
      foundUser.review.push(createdReview._id)
      foundUser.save()
      .then(() => {
        res.status(200).json("Review created succesfully")
      })
      .catch(err => res.json(err))
    })
    .catch(err => res.json(err))
  })
  .catch(err => res.json(err))
})

module.exports = router;
