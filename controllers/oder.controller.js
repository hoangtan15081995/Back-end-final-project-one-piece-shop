const { add } = require("nodemon/lib/rules");
const { catchAsync, sendResponse, AppError } = require("../helpers/utils");
const Cart = require("../models/Cart");
const Order = require("../models/Order");
const Product = require("../models/Product");

const orderController = {};

orderController.addNewOrders = catchAsync(async (req, res, next) => {
  const { currentUserId } = req;
  const { address, phone, totalPrice } = req.body;
  console.log(address, phone);

  const cart = await Cart.findOne({ owner: currentUserId });
  if (!cart) {
    throw new AppError(404, "Your cart not found", "Add new order error");
  }

  const order = await Order.create({
    owner: currentUserId,
    products: cart.products,
    phone: parseInt(phone),
    totalPrice: totalPrice,
    address: address,
    status: "Pending",
  });

  return sendResponse(res, 200, true, { order }, null, "order succesfull");
});

orderController.getListOrders = catchAsync(async (req, res, next) => {
  const { currentUserId } = req;
  let { page, limit } = req.query;
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 5;
  const offset = limit * (page - 1);
  const total = await Order.find({ owner: currentUserId }).countDocuments();
  const totalPagesListOrder = Math.ceil(total / limit);

  let listOrder = await Order.find({ owner: currentUserId })
    .sort({ createdAt: -1 })
    .skip(offset)
    .limit(limit)
    .populate("owner")
    .populate({ path: "products", populate: "product" });

  return sendResponse(
    res,
    200,
    true,
    { listOrder, totalPagesListOrder },
    null,
    "Get list order success"
  );
});

orderController.getOrderById = catchAsync(async (req, res, next) => {
  const { currentUserId } = req;
  const { id } = req.params;
  let { page, limit } = req.query;

  const currentOrder = await Order.findOne({ _id: id })
    .populate("owner")
    .populate({ path: "products", populate: "product" });

  return sendResponse(
    res,
    200,
    true,
    currentOrder,
    null,
    "Get single order success"
  );
});

orderController.updateOrders = catchAsync(async (req, res, next) => {
  const { currentUserId } = req;
  const { phone, address, orderId } = req.body;

  let currentOrder = await Order.findOne({
    owner: currentUserId,
    _id: orderId,
  });

  if (currentOrder.status == "Pending") {
    currentOrder.status = "Done";
  } else {
    throw new AppError(
      404,
      "You can not update this order",
      "update order error"
    );
  }

  currentOrder.save();

  return sendResponse(
    res,
    200,
    true,
    currentOrder,
    null,
    "Update order successful"
  );
});

orderController.updateOrderById = catchAsync(async (req, res, next) => {
  const { currentUserId } = req;
  const { address, phone, totalPrice, products } = req.body;
  const { id } = req.params;
  console.log(address, phone, totalPrice, id);

  let currentOrder = await Order.findOne({
    owner: currentUserId,
    _id: id,
  });
  currentOrder.address = address;
  currentOrder.phone = phone;
  currentOrder.totalPrice = totalPrice;
  currentOrder.products = products;

  currentOrder.save();

  return sendResponse(
    res,
    200,
    true,
    currentOrder,
    null,
    "Update order successful"
  );
});

orderController.updateProductOrderById = catchAsync(async (req, res, next) => {
  const { currentUserId } = req;
  const { condition, productId } = req.body;
  const { id } = req.params;
  console.log(condition, productId, id);

  let currentOrder = await Order.findOne({
    owner: currentUserId,
    _id: id,
  });
  console.log("currentOrder", currentOrder);
  if (!currentOrder) {
    throw new AppError(
      404,
      "You can not update this product cart",
      "update product cart error"
    );
  } else if (condition == "Ins") {
    currentOrder.products.find(
      (item) => item.product == productId
    ).quantity += 1;
  } else if (condition == "Des") {
    currentOrder.products.find(
      (item) => item.product == productId
    ).quantity -= 1;
  }
  if (
    currentOrder.products.find((item) => item.product == productId).quantity ==
    0
  ) {
    currentOrder.products = currentOrder.products.filter((item) => {
      return item.product.toString() !== productId;
    });
  }

  currentOrder.save();

  return sendResponse(
    res,
    200,
    true,
    currentOrder,
    null,
    "Update order successful"
  );
});

orderController.deleteProductOrderById = catchAsync(async (req, res, next) => {
  const { currentUserId } = req;
  const { productId } = req.body;
  const { id } = req.params;

  let currentOrder = await Order.findOne({
    owner: currentUserId,
    _id: id,
  });
  if (!currentOrder) {
    throw new AppError(
      404,
      "You can not delete this product cart",
      "delete product cart error"
    );
  } else if (currentOrder.products.some((item) => item.product == productId)) {
    currentOrder.products = currentOrder.products.filter((item) => {
      return item.product.toString() !== productId;
    });
  }
  currentOrder.save();

  return sendResponse(
    res,
    200,
    true,
    currentOrder,
    null,
    "delete cart successful"
  );
});

orderController.deleteOrders = catchAsync(async (req, res, next) => {
  const { currentUserId } = req;
  const { id } = req.params;
  await Order.findByIdAndDelete(id);
  return sendResponse(res, 200, true, null, null, "delete order successful");
});

module.exports = orderController;
