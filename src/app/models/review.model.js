const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var reviewSchema = new mongoose.Schema(
  {
    star: {
        type: Number,
        require: true
    },
    comment: {
        type: String,
        require: true,
    },
    productID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    enable: {
      type: Boolean,
      default: false,
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
  },
  {
    collection: "reviews",
    timestamps: true,
  }
);

module.exports = mongoose.model("Review", reviewSchema);