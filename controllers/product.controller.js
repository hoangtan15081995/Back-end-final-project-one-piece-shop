const { sendResponse, catchAsync, AppError } = require("../helpers/utils");
const Product = require("../models/Product");
const Cart = require("../models/Cart");
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
  console.log(searchquery);
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 12;
  const offset = limit * (page - 1);

  const total = await Product.find({
    $text: { $search: searchquery },
  }).countDocuments();
  const totalPagesSearch = Math.ceil(total / limit);
  const product = await Product.find({
    $text: { $search: searchquery },
  })
    .skip(offset)
    .limit(limit);
  if (product.length === 0) {
    throw new AppError(404, "Product not found", "Get product error");
  }
  return sendResponse(
    res,
    200,
    true,
    { product, total, totalPagesSearch },
    null,
    "Get product successful"
  );
});

productController.getProductsCatagory = catchAsync(async (req, res, next) => {
  let { page, limit } = req.query;
  const { catagory } = req.body;
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 12;
  const offset = limit * (page - 1);
  const total = await Product.find({
    catagories: catagory,
  }).countDocuments();
  const totalPagesCatagory = Math.ceil(total / limit);

  const products = await Product.find({ catagories: catagory })
    .skip(offset)
    .limit(limit);
  if (products.length === 0) {
    throw new AppError(404, "Product not found", "Get product catagory error");
  }
  return sendResponse(
    res,
    200,
    true,
    { products, totalPagesCatagory },
    null,
    "get product catagory successful"
  );
});

productController.getUpdateQuantityProduct = catchAsync(
  async (req, res, next) => {
    const { currentUserId } = req;
    const { id } = req.params;
    const product = await Product.findById(id);
    let productCart = await Cart.findOne({ owner: currentUserId });

    console.log(product);
    if (!product) {
      throw new AppError(404, "Product not found", "Get single product error");
    }
    if (productCart.products.some((item) => item.product == id)) {
      product.totalProducts = product.totalProducts;
    } else if (product.totalProducts > 0) {
      product.totalProducts -= 1;
    } else {
      product.totalProducts = 0;
    }
    product.save();
    return sendResponse(
      res,
      200,
      true,
      { product },
      null,
      "update totalProduct successful"
    );
  }
);

productController.getUpdateQuantityProductInSearch = catchAsync(
  async (req, res, next) => {
    const { currentUserId } = req;
    const { id } = req.params;
    const product = await Product.findById(id);
    let productCart = await Cart.findOne({ owner: currentUserId });

    console.log(product);
    if (!product) {
      throw new AppError(404, "Product not found", "Get single product error");
    }
    if (productCart.products.some((item) => item.product == id)) {
      product.totalProducts = product.totalProducts;
    } else if (product.totalProducts > 0) {
      product.totalProducts -= 1;
    } else {
      product.totalProducts = 0;
    }
    product.save();
    return sendResponse(
      res,
      200,
      true,
      { product },
      null,
      "update totalProduct successful"
    );
  }
);

productController.getUpdateQuantityProductInCatagory = catchAsync(
  async (req, res, next) => {
    const { currentUserId } = req;
    const { id } = req.params;
    const product = await Product.findById(id);
    let productCart = await Cart.findOne({ owner: currentUserId });

    console.log(product);
    if (!product) {
      throw new AppError(404, "Product not found", "Get single product error");
    }
    if (productCart.products.some((item) => item.product == id)) {
      product.totalProducts = product.totalProducts;
    } else if (product.totalProducts > 0) {
      product.totalProducts -= 1;
    } else {
      product.totalProducts = 0;
    }
    product.save();
    return sendResponse(
      res,
      200,
      true,
      { product },
      null,
      "update totalProduct successful"
    );
  }
);

productController.getUpdateQuantityProductDetail = catchAsync(
  async (req, res, next) => {
    const { currentUserId } = req;
    const { id } = req.params;
    const product = await Product.findById(id);
    let productCart = await Cart.findOne({ owner: currentUserId });

    console.log(product);
    if (!product) {
      throw new AppError(404, "Product not found", "Get single product error");
    }
    if (productCart.products.some((item) => item.product == id)) {
      product.totalProducts = product.totalProducts;
    } else if (product.totalProducts > 0) {
      product.totalProducts -= 1;
    } else {
      product.totalProducts = 0;
    }
    product.save();
    return sendResponse(
      res,
      200,
      true,
      { product },
      null,
      "update totalProduct successful"
    );
  }
);

productController.getUpdateQuantityProductinCart = catchAsync(
  async (req, res, next) => {
    const { currentUserId } = req;
    const { id } = req.params;
    const { condition } = req.body;
    const product = await Product.findById(id);
    let productCart = await Cart.findOne({ owner: currentUserId });
    console.log(productCart);
    if (!productCart) {
      throw new AppError(
        404,
        "You can not update this product cart",
        "update product cart error"
      );
    } else if (condition == "Ins") {
      product.totalProducts -= 1;
    } else if (condition == "Des") {
      product.totalProducts += 1;
    }
    // if (
    //   productCart.products.find((item) => item.product == productId).quantity == 0
    // ) {
    //   productCart.products = productCart.products.filter((item) => {
    //     return item.product.toString() !== productId;
    //   });
    // }
    product.save();
    return sendResponse(
      res,
      200,
      true,
      { product },
      null,
      "update totalProduct successful"
    );
  }
);

productController.getUpdateQuantityProductinCartDelete = catchAsync(
  async (req, res, next) => {
    const { currentUserId } = req;
    const { id } = req.params;
    const { condition, quantity } = req.body;
    const product = await Product.findById(id);
    let productCart = await Cart.findOne({ owner: currentUserId });
    console.log(productCart);
    if (!productCart) {
      throw new AppError(
        404,
        "You can not update this product cart",
        "update product cart error"
      );
    } else if (condition == "Del") {
      product.totalProducts += quantity;
    }
    // if (
    //   productCart.products.find((item) => item.product == productId).quantity == 0
    // ) {
    //   productCart.products = productCart.products.filter((item) => {
    //     return item.product.toString() !== productId;
    //   });
    // }
    product.save();
    return sendResponse(
      res,
      200,
      true,
      { product },
      null,
      "update totalProduct successful"
    );
  }
);

module.exports = productController;
