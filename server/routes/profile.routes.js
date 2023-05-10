const express = require("express");
const router = express.Router();
const mongoose = require('mongoose')

const Product = require("../models/Products.model")
const User = require("../models/User.model")
const Offer = require("../models/Offer.model")
const Review = require("../models/Review.model")

const { isAuthenticated } = require("../middleware/jwt.middleware.js");


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

  router.get("member/edit", isAuthenticated, (req, res , next) => {

    const { userId } = req.payload._id 

    User.findById(userId)
    .then(response => {
      res.json(response)
    })

  })


  router.get("/memberpreview", (req, res, next) => {

    const { q } = req.query
  
    User.find({ $or: [{ name: {$regex: q, $options: "i" } }, { description: {$regex: q, $options: "i" } }] })
      .then(users => {
        users.slice(0, 3) 
        res.json(users)
      })
      .catch(err => res.json(err))
  })
  
  module.exports = router;