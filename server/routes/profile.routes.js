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
  .then(user => {
    if(req.payload._id === user.id.toString()) { //we check if the ID on the JWT matches the ID of the fetched user
      res.json({user, isSelf: true})
    }
    else {
      res.json({user, isSelf: false})
    }
  })

})

router.get("/member/:userId/edit", isAuthenticated, (req, res , next) => {

  const { userId } = req.payload._id 

  User.findById(userId)
  .then(response => {
    res.json(response)
  })

})

// Route to create a follow
router.post("/member/:userId", isAuthenticated, (req, res, next) => {

  const { userId } = req.params

  Follow.create({...req.body, user: req.payload._id})
  .then(response => {
    res.json(response)
    console.log(response)
  })
  .catch(err => res.json(err))
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

