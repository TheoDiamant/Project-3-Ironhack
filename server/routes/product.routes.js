const express = require("express");
const router = express.Router();
const mongoose = require('mongoose')

const Product = require("../models/Products.model")
const User = require("../models/User.model")
const { isAuthenticated } = require("../middleware/jwt.middleware.js");

const fileUploader = require("../config/cloudinary.config");

// Route to upload images om cloud //////// WORK  ////////
router.post("/upload", fileUploader.single("imageUrl"), (req, res, next) => {
    // console.log("file is: ", req.file)
   
    if (!req.file) {
      next(new Error("No file uploaded!"));
      return;
    }
    
    // Get the URL of the uploaded file and send it as a response.
    // 'fileUrl' can be any name, just make sure you remember to use the same when accessing it on the frontend
    
    res.json({ fileUrl: req.file.path });
  });


// Route to create a products  //////// WORK  ////////
router.post("/products", isAuthenticated, (req, res, next) => {
    const { img, title, description, price } = req.body

    Product.create({ img, title, description, price, user: req.payload._id  })
    .then(response => res.json(response.data))
    .catch(err => res.json(err))
})

// Route to get all the products //////// WORK  ////////

router.get("/products", isAuthenticated, (req, res, next) => {
    

    Product.find()
    .then(allProducts => {
        res.json(allProducts)
    })
    .catch(err => res.json(err))

})


// Route to get a product by ID  //////// WORK  ////////

router.get("/products/:productId", (req, res, next) => {

    const { productId } = req.params

    if (!mongoose.Types.ObjectId.isValid(productId)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
      }

    Product.findById(productId)
    .then(product => res.status(200).json(product))
    .catch(error => res.json(error));
})

// Route to UPDATE/EDIT a product by ID //////// WORK  ////////
router.post("/products/:productId/edit", (req, res, next) => {

    const { productId } = req.params

    if (!mongoose.Types.ObjectId.isValid(productId)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
      }

    Product.findByIdAndUpdate(productId, req.body, { new: true })
    .then((updateProduct) => res.json(updateProduct))
    .catch(error => res.json(error))

})


// Route to DELETE a product by ID //////// WORK  ////////

router.delete("/products/:productId", (req, res, next) => {

    const { productId } = req.params

    if (!mongoose.Types.ObjectId.isValid(productId)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
      }

      Product.findByIdAndDelete(productId)
      .then(() => res.json({ message: `Product with ${productId} is removed successfully.` }))
      .catch(error => res.json(error));

})

module.exports = router;