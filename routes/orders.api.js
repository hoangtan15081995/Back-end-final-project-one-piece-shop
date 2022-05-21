const express = require("express");
const { body, param } = require("express-validator");
const {
  addNewOrders,
  getListOrders,
  updateOrders,
  deleteOrders,
  getOrderById,
  updateOrderById,
  updateProductOrderById,
  deleteProductOrderById,
} = require("../controllers/oder.controller");
const { loginRequired } = require("../middlewares/authentication");
const { validate, checkObjectId } = require("../middlewares/validator");
const router = express.Router();

router.post(
  "/add",
  loginRequired,
  validate([
    body("phone").exists(),
    body("address").exists().isString(),
    body("totalPrice").exists(),
  ]),
  addNewOrders
);
router.get("/list", loginRequired, getListOrders);
router.get("/list/:id", loginRequired, getOrderById);
router.put("/update", loginRequired, updateOrders);
router.put("/update/:id", loginRequired, updateOrderById);
router.put("/update/product/:id", loginRequired, updateProductOrderById);
router.put("/delete/product/:id", loginRequired, deleteProductOrderById);
router.put("/:id", loginRequired, deleteOrders);

module.exports = router;
