const { Schema, model } = require("mongoose");


const likeSchema = new Schema(
    {
        user: [{type: Schema.Types.ObjectId, ref: "User"}],
        products: [{type: Schema.Types.ObjectId, ref: "Product"}]
    },
    {
      timestamps: true,
    }
  );
  
  const Like = model("Like", likeSchema);
  
  module.exports = Like;
  