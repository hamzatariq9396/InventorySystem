const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  status: {
    type: String,
    default: "Pending",
    enum: ["active", "disable"],
  },
  title: {
    type: String,
    required: [true, "Please Enter product Name"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please Enter product Description"],
  },
  price: {
    type: Number,
    required: [true, "Please Enter product Price"],
    maxLength: [10, "Price cannot exceed 10 digits"],
  },
  category: {
    type: String,
    required: [true, "Please Enter Product Category"],
    // enum: ["Property", "Vehicles", "MiscProducts"],
  },
  image_url: {
    type: String,
    required: [true, "Please Enter image url."],
   
  },

  createdAt: {
    type: Date,
    default: Date.now,
  }
});



module.exports = mongoose.model("Product", productSchema);
