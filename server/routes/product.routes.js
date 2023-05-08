const express = require("express");
const router = express.Router();
const mongoose = require('mongoose')

const Product = require("../models/Products.model")
const User = require("../models/User.model")
const Offer = require("../models/Offer.model")
const Review = require("../models/Review.model")

const { isAuthenticated } = require("../middleware/jwt.middleware.js");

const fileUploader = require("../config/cloudinary.config");

// Route to upload images om cloud //////// WORK  ////////
router.post("/upload", fileUploader.single("image"), (req, res, next) => {
    console.log("file is: ", req.file)
   
    if (!req.file) {
      next(new Error("No file uploaded!"));
      return;
    }
    
    // Get the URL of the uploaded file and send it as a response.
    // 'fileUrl' can be any name, just make sure you remember to use the same when accessing it on the frontend
    
    res.json({ fileUrl: req.file.path });
  });

// TEST ROUTE, MAY BE DELETED
router.post("/uploadmany", fileUploader.array("image"), (req, res, next) => {
  const images = req.files
  const imagePaths = []
  for (let i = 0; i < images.length; i++) {
    imagePaths.push(images[i].path)
  }
  res.json(imagePaths)
})


// Route to create a products  //////// WORK  ////////
router.post("/products", isAuthenticated, (req, res, next) => {

    Product.create({ ...req.body, user: req.payload._id  })
    .then(response => {

      res.json(response)
      console.log(response)

      return User.findByIdAndUpdate(req.payload._id, {
        $push: {product: response._id}},
        {new: true})
    })
    .catch(err => res.json(err))
})

// Route to get all the products //////// WORK  ////////

router.get("/products", (req, res, next) => {
    

    Product.find()
    .populate("user")
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



// Route to create an offer for a product //////// WORK  ////////
router.post("/products/:productId/offer", isAuthenticated, (req, res, next) => {

  const { productId } = req.params

  const { price, message } = req.body

  if (!mongoose.Types.ObjectId.isValid(productId)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }

    let offer;

    Offer.create({price, message, user: req.payload._id, product: productId})
    .then(response =>{
      offer = response
      return User.findByIdAndUpdate(req.payload._id, {$push: {offer: response._id}, },{new: true})
      })
      .then(() => {
        return Product.findByIdAndUpdate(productId, {$push: {offer: offer._id}, },{new: true} )
      })
      .then(() => {
        res.json(response.data)
      })
      .catch(err => res.json(err))
      
})


// Route to create a review for a product //////// WORK  ////////
router.post("/products/:productId/review", isAuthenticated, (req, res, next) => {

  const { productId } = req.params

  const { title, message, img } = req.body

  if (!mongoose.Types.ObjectId.isValid(productId)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }

    let review;

    Review.create({ title, message, img, user: req.payload._id, product: productId })
      .then(response => {
        review = response;
        return User.findByIdAndUpdate(req.payload._id, { $push: { review: response._id } }, { new: true });
      })
      .then(() => {
        return Product.findByIdAndUpdate(productId, { $push: { review: review._id } }, { new: true });
      })
      .then(() => {
        res.json(review);
      })
      .catch(err => res.json(err));
  });

// Route to get the review for a product //////// WORK  ////////
router.get("/products/:productId/review", (req, res, next) => {

  const { productId } = req.params

  if (!mongoose.Types.ObjectId.isValid(productId)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }

    Review.find()
    .then(response => {
      res.json(response)
    })
    .catch(err => res.json(err))

})

// Route to get the offer for a product //////// WORK  ////////
router.get("/products/:productId/offer", (req, res, next) => {

  const { productId } = req.params

  if (!mongoose.Types.ObjectId.isValid(productId)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }

    Offer.find()
    .then(response => {
      res.json(response)
    })
    .catch(err => res.json(err))

})




module.exports = router;