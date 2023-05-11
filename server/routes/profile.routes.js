const express = require("express");
const router = express.Router();
const mongoose = require('mongoose')

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
  .populate("product")
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
router.post("/follow/:userId", isAuthenticated, (req, res, next) => {

  const userFollowed = req.params.userId
  const userFollowing = req.payload._id

  Follow.find({user: new ObjectId(userFollowing)}) //Search the database for the Follow document belonging to the user who is following 
  .then(response => {

    if (response.length === 0) { //If it doesn't exist (first time following), create it
      Follow.create({user: new ObjectId(userFollowing), userFollows: [new ObjectId(userFollowed)]})
      .then(response => {
        res.json(response)
      })
      .catch(err => res.json(err))
    }
    else { //If it does exist, add the new person being followed to the array
      response.userFollows.push(new ObjectId(userFollowed))
      response.save()
        .then(() => { //Then search the database for the Follow document belonging to the user being followed
          Follow.find({user: new ObjectId(userFollowed)})
            .then(response => {

              if(response.length === 0) { //If it doesn't exist, create it and set "followers" to 1
                Follow.create({user: new ObjectId(userFollowed), followers: 1})
                  .then(() => res.json(response))
              }
              else { //If it does exist, update the follower count
                response.followers += 1
                response.save()
                  .then(() => res.json(response))
              }
            })
        })
    }
  })
})

module.exports = router;


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

