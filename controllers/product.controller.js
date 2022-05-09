const { sendResponse, catchAsync, AppError } = require("../helpers/utils");
const Product = require("../models/Product");
const productController = {};

productController.getAllProducts = catchAsync(async (req, res, next) => {
  let { page, limit } = req.query;
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 2;
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

module.exports = productController;
