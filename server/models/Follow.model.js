const { Schema, model } = require("mongoose");


const followSchema = new Schema(
    {

      follow: {
        type: Number,
      },

      user: [{type: Schema.Types.ObjectId, ref: "User"}],
     


    },
    {
      // this second object adds extra properties: `createdAt` and `updatedAt`
      timestamps: true,
    }
  );
  
  const Follow = model("Follow", followSchema);
  
  module.exports = Follow;
  