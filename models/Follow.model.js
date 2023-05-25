const { Schema, model } = require("mongoose");


const followSchema = new Schema(
    {
      user: {
        type: Schema.Types.ObjectId, ref: "User" //user who this belongs to, the one who follows
      },
      followers: {
        type: Number,
      },
      userFollows: [{type: Schema.Types.ObjectId, ref: "User"}], //array of followed users, not user who follows
    },
    {
      timestamps: true,
    }
  );
  
  const Follow = model("Follow", followSchema);
  
  module.exports = Follow;
  