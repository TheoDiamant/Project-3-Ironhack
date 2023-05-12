const { Schema, model } = require("mongoose");


const likeSchema = new Schema(
    {
        like: {
            type: Number,
        },
        user: [{type: Schema.Types.ObjectId, ref: "User"}],
        product: [{type: Schema.Types.ObjectId, ref: "Product"}]
    },
    {
      timestamps: true,
    }
  );
  
  const Like = model("Like", likeSchema);
  
  module.exports = Like;
  