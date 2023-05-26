const { Schema, model } = require("mongoose");

const reviewSchema = new Schema(
    { 
      reviewText: {
        type: String
      },   
      userReviewing: {
        type: Schema.Types.ObjectId, ref: "User"
      }
    },
    {
      // this second object adds extra properties: `createdAt` and `updatedAt`
      timestamps: true,
    }
  );
  
  const Review = model("Review", reviewSchema);
  
  module.exports = Review;
  