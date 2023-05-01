const express = require("express");
const router = express.Router();
const mongoose = require('mongoose')

const Product = require("../models/Products.model")


// Route to create a products  //////// WORK  ////////
router.post("/products", (req, res, next) => {
    const { img, title, description, price } = req.body

    Product.create({ img, title, description, price})
    .then(response => res.json(response.data))
    .catch(err => res.json(err))
})

// Route to get all the products //////// WORK  ////////

router.get("/products", (req, res, next) => {
    Product.find()
    .then(allProducts => res.json(allProducts))
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
router.put("/products/:productId", (req, res, next) => {

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