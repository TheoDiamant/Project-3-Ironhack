const express = require("express");
const router = express.Router();

const Product = require("../models/Products.model")
const User = require("../models/User.model")
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

  Product.findById(productId)
  .populate({
    path: "products",
    populate: {
      path: "user",
    }
  })
  .then(product => {
    res.status(200).json(product)
  })
  .catch(error => res.json(error));

})


// Route to get several products by ID for the initial cart load
router.post("/cart", (req, res, next) => {

  const productIds = req.body

  Product.find({ _id: { $in: productIds } })
  .then(response => res.json(response))
  .catch(err => res.json(err))
})


// Route to UPDATE/EDIT a product by ID //////// WORK  ////////
router.post("/products/:productId/edit", (req, res, next) => {

  const { productId } = req.params

  

  Product.findByIdAndUpdate(productId, req.body, { new: true })
  .then((updateProduct) => res.json(updateProduct))
  .catch(error => res.json(error))
})


// Route to DELETE a product by ID //////// WORK  ////////
router.delete("/products/:productId", (req, res, next) => {

  const { productId } = req.params

  Product.findByIdAndDelete(productId)
  .then(() => res.json({ message: `Product with ${productId} is removed successfully.` }))
  .catch(error => res.json(error));
})


// Route get product details for checkout by ID //////// WORK  ////////
router.get("/checkout/:productId", (req, res, next) => {

  const { productId } = req.params

  Product.findById(productId)
  .populate("user")
  .then(response => {
    res.json(response)
  })
  .catch(err => res.json(err))
})

// Route to get products based on query
router.get("/search", (req, res, next) => {

  const { q } = req.query

  Product.find({ $or: [{ title: {$regex: q, $options: "i" } }, { description: {$regex: q, $options: "i" } }] })
  .populate("user")
  .then(allProducts => {
    res.json(allProducts)
  })
  .catch(err => res.json(err))
})

// Route to check whether a user likes a product already or not
router.post("/products/:productId/like-check", (req, res, next) => {

  const { productId } = req.params
  const { user } = req.body

  Like.findOne({user: user._id})
  .then((response) => {
    if(!response) {
      res.json({likes: false})
    }
    else {
      if(response.products.includes(productId)) {
        res.json({likes: true})
      }
      else {
        res.json({likes: false})
      }
    }
  })
  .catch(err => res.json(err))
})

// Route to add a like to the user's Like document (and create it on the very first like event)
router.post("/products/:productId/like", (req, res, next) => {

  const { productId } = req.params
  const { user } = req.body

  Like.findOne({user: user._id})
  .then((response) => {

    if(!response) {

      Like.create({ user: user })
      .then((createdResponse) => {
        createdResponse.products.push(productId)
        createdResponse.save()
        .then(() => {
          res.status(200).json({ message: 'Product liked successfully.' })
        })
        .catch(err => res.json(err))
      })
      .catch(err => res.json(err))

    }
    else {

      response.products.push(productId)
      response.save()
      .then(() => {
        res.status(200).json({ message: 'Product liked successfully.' })
      })
      .catch(err => res.json(err))

    }
  })
  .catch(err => res.json(err))
})

// Route to un-like a product
router.post('/products/:productId/unlike', (req, res, next) => {

  const { productId } = req.params
  const { user } = req.body

  Like.findOne({ user: user._id })
  .then((response) => {
    response.products = response.products.filter(product => product != productId)
    response.save()
    .then(() => {
      res.status(200).json({ message: 'Product un-liked successfully.' })
    })
    .catch(err => res.json(err))
  })
  .catch(err => res.json(err))
})

// Route to get a user's Like document
router.post("/all-likes", (req, res, next) => {

  const { user } = req.body

  Like.findOne({ user: user._id })
  .populate({
    path: "products",
    populate: {
      path: "user",
    }
  })
  .then((response) => {
    res.json(response)
  })
  .catch(err => res.json(err))
})

module.exports = router;

