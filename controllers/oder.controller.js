const { add } = require("nodemon/lib/rules");
const { catchAsync, sendResponse, AppError } = require("../helpers/utils");
const Cart = require("../models/Cart");
const Order = require("../models/Order");
const Product = require("../models/Product");

const orderController = {};

orderController.addNewOrders = catchAsync(async (req, res, next) => {
  const { currentUserId } = req;
  const { address, phone } = req.body;
  console.log(address, phone);

  const cart = await Cart.findOne({ owner: currentUserId });
  // const orderCart = await Order.findOne({ owner: currentUserId });
  if (!cart) {
    throw new AppError(404, "Your cart not found", "Add new order error");
  }
  // if (orderCart) {
  //   throw new AppError(404, "Your cart ready exitls", "Add new order error");
  // }
  const order = await Order.create({
    owner: currentUserId,
    products: cart.products,
    phone: parseInt(phone),
    address: address,
    // totalPrice: parseInt(totalPrice),
    status: "pending",
  });
  // cart.isDeleted = true;
  // cart.save();
  return sendResponse(res, 200, true, { order }, null, "order succesfull");
});

orderController.getListOrders = catchAsync(async (req, res, next) => {
  const { currentUserId } = req;
  let { page, limit } = req.query;
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 2;
  const offset = limit * (page - 1);
  const total = await Order.find({ owner: currentUserId }).countDocuments();
  const totalPagesOrder = Math.ceil(total / limit);

  const listOrder = await Order.find({ owner: currentUserId })
    .skip(offset)
    .limit(limit)
    .populate("owner")
    .populate({ path: "products", populate: "product" });
  // if (!currentOrder) {
  //   throw new AppError(404, "productCart not found", "get list product error");
  // }

  return sendResponse(
    res,
    200,
    true,
    { listOrder, totalPagesOrder },
    null,
    "Get list order cart success"
  );
});
orderController.updateOrders = catchAsync(async (req, res, next) => {
  const { currentUserId } = req;
  const { phone, address } = req.body;
  const { orderId } = req.params;

  let currentOrder = await Order.findOne({
    owner: currentUserId,
    _id: orderId,
  });

  // if (currentOrder.data.status !== "pending") {
  //   throw new AppError(404, "can not update", "update order error");
  // }
  if (!currentOrder) {
    throw new AppError(
      404,
      "You can not update this order",
      "update order error"
    );
  } else {
    currentOrder.phone = parseInt(phone);
    currentOrder.address = address;
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

orderController.deleteOrders = catchAsync(async (req, res, next) => {
  const { currentUserId } = req;
  const { orderId } = req.params;

  await Order.deleteOne({
    owner: currentUserId,
    _id: orderId,
  });
  return sendResponse(
    res,
    200,
    true,
    { Order },
    null,
    "delete order successful"
  );
});

module.exports = orderController;
