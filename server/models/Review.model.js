const { Schema, model } = require("mongoose");


const reviewSchema = new Schema(
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

      message: {
        type: String,
        required: [true, "Description is required."],
      },
     
      user: [{type: Schema.Types.ObjectId, ref: "User"}],
      product: [{type: Schema.Types.ObjectId, ref: "Product"}]


    },
    {
      // this second object adds extra properties: `createdAt` and `updatedAt`
      timestamps: true,
    }
  );
  
  const Review = model("Review", reviewSchema);
  
  module.exports = Review;
  