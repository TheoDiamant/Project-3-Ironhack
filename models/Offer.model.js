const { Schema, model } = require("mongoose");


const offerSchema = new Schema(
    {
        price: {
          type: Number,
          // required: [true, "Price is required."],
        },

      message: { type: String },

      product: [{type: Schema.Types.ObjectId, ref: "Product"}],
      user: [{type: Schema.Types.ObjectId, ref: "User"}],
    },
    {
      // this second object adds extra properties: `createdAt` and `updatedAt`
      timestamps: true,
    }
  );
  
  const Offer = model("Offer", offerSchema);
  
  module.exports = Offer;
  