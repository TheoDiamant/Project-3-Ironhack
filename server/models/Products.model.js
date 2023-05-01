const { Schema, model } = require("mongoose");


const productSchema = new Schema(
    {
      img:  [
        {
          type: String
        },
      ],
      
      title: {
        type: String,
        required: [true, "Title is required."],
      },
      description: {
        type: String,
        required: [true, "Description is required."],
      },
      price: {
        type: Number,
        required: [true, "price is required."],
      },
    },
    {
      // this second object adds extra properties: `createdAt` and `updatedAt`
      timestamps: true,
    }
  );
  
  const Product = model("Product", productSchema);
  
  module.exports = Product;
  