const express = require("express");
const router = express.Router();
const mongoose = require('mongoose')

const Product = require("../models/Products.model")
const User = require("../models/User.model")
const Offer = require("../models/Offer.model")
const Review = require("../models/Review.model")
const Like = require("../models/Like.model")

const { isAuthenticated } = require("../middleware/jwt.middleware.js");

const fileUploader = require("../config/cloudinary.config");

// Route to upload several images at once to the cloud //////// WORK  ////////
router.post("/uploadmany", fileUploader.array("image"), (req, res, next) => {
  const images = req.files
  const imagePaths = []
  for (let i = 0; i < images.length; i++) {
    imagePaths.push(images[i].path)
  }
  res.json(imagePaths)
})

// Route to upload a single image to the cloud - used for profile picture change
router.post("/upload", fileUploader.single("image"), (req, res, next) => {
  res.json(req.file.path);
});



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


// Route to get product previews
router.get("/preview", (req, res, next) => {

  const { q } = req.query

  Product.find({ $or: [{ title: {$regex: q, $options: "i" } }, { description: {$regex: q, $options: "i" } }] })
    .populate("user")
    .then(allProducts => {
      allProducts = allProducts.slice(0, 3) 
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
  .populate("user")
  .then(product => {
    res.status(200).json(product)
  })
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




// Route to create an offer for a product //////// WORK  ////////
router.post("/products/:productId/like", isAuthenticated, (req, res, next) => {

  const { productId } = req.params

  if (!mongoose.Types.ObjectId.isValid(productId)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }

    let like;

    Like.create({user: req.payload._id, product: productId})
    .then(response =>{
      like = response
      return User.findByIdAndUpdate(req.payload._id, {$push: {like: response._id}, },{new: true})
      })
      .then(() => {
        return Product.findByIdAndUpdate(productId, {$push: {like: offer._id}, },{new: true} )
      })
      .then(() => {
        res.json(response.data)
      })
      .catch(err => res.json(err))
      
})





module.exports = router;