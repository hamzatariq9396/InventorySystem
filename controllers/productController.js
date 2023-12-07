const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");


// Create Product  -- SELLER
exports.createProduct = catchAsyncErrors(async (req, res, next) => {

  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
    status:200,
    message:"Product Create Successfully"
  });
});






// Get All Products
exports.getAllProducts = catchAsyncErrors(async (req, res) => {



  const products = await Product.find();
  let productsCount = await Product.countDocuments({ status: "active" });



  res.status(200).json({
    success: true,
    productsCount,
    products,
    status:200,
    message:"Products Found Successfully"
   
  });
});

// Get All Products --Admin




// GET Single Product
exports.getSingleProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }

  res.status(200).json({
    success: true,
    product,
    status:200,
    message:"Products Found Successfully"
  });
});






// Update a Product  --SELLER
exports.updateProduct = catchAsyncErrors(async (req, res) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }
  if(req.body.price===0  || req.body.price <0){
    return res.status(400).json({message:"PLease Enter Valid Amount"})
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
    status:200,
    message:"Products Update  Successfully"
  });
});






// DELETE PRODUCT -- ADMIN,SELLER
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);


  await product.remove();

  res.status(200).json({
    success: true,
    message: "Product Deleted Successfully",
    product,
    status:200,
  });
});



