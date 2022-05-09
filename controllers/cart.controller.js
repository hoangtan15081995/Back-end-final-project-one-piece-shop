const { sendResponse, catchAsync, AppError } = require("../helpers/utils");
const Product = require("../models/Product");
const Cart = require("../models/Cart");
const cartController = {};

cartController.addProductToCart = catchAsync(async (req, res, next) => {
  const { currentUserId } = req;
  const { productId } = req.body;

  const product = await Product.findOne({ _id: productId });
  if (!product) {
    throw new AppError(404, "Product not found", "Add product error");
  }

  let productCart = await Cart.findOne({ owner: currentUserId });
  if (!productCart) {
    productCart = await Cart.create({
      owner: currentUserId,
      products: [
        {
          product: productId,
          quantity: 1,
        },
      ],
    });
  } else if (!productCart.products.some((item) => item.product == productId)) {
    productCart.products.push({ product: productId, quantity: 1 });
  } else {
    throw new AppError(404, "Product already in the cart", "Add product error");
  }

  productCart.save();
  return sendResponse(
    res,
    200,
    true,
    productCart,
    null,
    "Add product to cart successful"
  );
});

cartController.getListProductsCart = catchAsync(async (req, res, next) => {
  const { currentUserId } = req;
  let { page, limit } = req.query;
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 2;
  const offset = limit * (page - 1);

  const currentCart = await Cart.findOne({ owner: currentUserId });
  if (!currentCart) {
    throw new AppError(404, "productCart not found", "get list product error");
  }
  const { products } = currentCart;
  const total = products.length;
  const totalPages = Math.ceil(total / limit);

  return sendResponse(
    res,
    200,
    true,
    { products },
    null,
    "Get list products cart success"
  );
});

module.exports = cartController;
