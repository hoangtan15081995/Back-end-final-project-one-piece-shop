const { sendResponse, catchAsync, AppError } = require("../helpers/utils");
const Product = require("../models/Product");
const productController = {};

productController.getAllProducts = catchAsync(async (req, res, next) => {
  let { page, limit } = req.query;
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 12;
  const offset = limit * (page - 1);

  const total = await Product.countDocuments();
  const totalPages = Math.ceil(total / limit);

  const products = await Product.find().skip(offset).limit(limit);
  return sendResponse(
    res,
    200,
    true,
    { products, total, totalPages },
    null,
    "Get all products success"
  );
});

productController.getSingleProductById = catchAsync(async (req, res, next) => {
  const { productId } = req.params;
  const product = await Product.findById(productId);
  if (!product) {
    throw new AppError(404, "Product not found", "Get single product error");
  }
  return sendResponse(
    res,
    200,
    true,
    { product },
    null,
    "Get single product successful"
  );
});

productController.findProductByName = catchAsync(async (req, res, next) => {
  let { page, limit } = req.query;
  const { searchquery } = req.body;
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 12;
  const offset = limit * (page - 1);

  const total = await Product.find({
    productName: searchquery,
  }).countDocuments();
  const totalPagesSearch = Math.ceil(total / limit);
  const product = await Product.find({
    productName: searchquery,
  })
    .skip(offset)
    .limit(limit);
  if (product.length === 0) {
    throw new AppError(404, "Product not found", "Get single product error");
  }
  return sendResponse(
    res,
    200,
    true,
    { product, total, totalPagesSearch },
    null,
    "Get single product successful"
  );
});

productController.filterProducts = catchAsync(async (req, res, next) => {
  const { catagories } = req.body;
  const product = await Product.find({ catagories: catagories });
  if (!product) {
    throw new AppError(404, "Product not found", "Get single product error");
  }
  return sendResponse(
    res,
    200,
    true,
    { product },
    null,
    "filter product successful"
  );
});

module.exports = productController;
