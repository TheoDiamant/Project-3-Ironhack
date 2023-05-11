const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    profilePicture: {
      type: String,
      default: "https://www.vinted.es/assets/no-photo/user-empty-state.svg",
    },
    following: [{type: Schema.Types.ObjectId, ref: "Follow"}],
    followers: {
      type: Number,
    },
    review: [{type: Schema.Types.ObjectId, ref: "Review"}],
    offer: [{type: Schema.Types.ObjectId, ref: "Offer"}],
    product: [{type: Schema.Types.ObjectId, ref: "Product"}],
  
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
