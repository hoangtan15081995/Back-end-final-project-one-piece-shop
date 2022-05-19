const express = require("express");
const router = express.Router();
const { body, param, header } = require("express-validator");
const {
  addProductToCart,
  getListProductsCart,
  updateProductCart,
  deleteProductCart,
} = require("../controllers/cart.controller");
const { loginRequired } = require("../middlewares/authentication");
const { validate, checkObjectId } = require("../middlewares/validator");

router.post(
  "/add",
  loginRequired,
  validate([body("productId").exists().isString().custom(checkObjectId)]),
  addProductToCart
);

router.get(
  "/list",
  loginRequired,
  validate([header("authorization").exists().isString()]),
  getListProductsCart
);

router.put(
  "/update",
  loginRequired,
  validate([body("productId").exists().isString()]),
  updateProductCart
);

router.put(
  "/delete",
  loginRequired,
  validate([body("productId").exists().isString()]),
  deleteProductCart
);

module.exports = router;
