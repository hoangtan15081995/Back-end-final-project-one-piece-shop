const express = require("express");
const { param, body } = require("express-validator");
const { checkObjectId, validate } = require("../middlewares/validator");
const {
  getAllProducts,
  getSingleProductById,
  findProductByName,
  getProductsCatagory,
} = require("../controllers/product.controller");
const { loginRequired } = require("../middlewares/authentication");
const router = express.Router();

router.get("/list", getAllProducts);

router.get(
  "/:productId",
  validate([param("productId").exists().isString().custom(checkObjectId)]),
  getSingleProductById
);

router.post(
  "/find",
  validate([body("searchquery").exists().isString()]),
  findProductByName
);

router.post(
  "/catagory",
  validate([body("catagory").exists().isString()]),
  getProductsCatagory
);
module.exports = router;
