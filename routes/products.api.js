const express = require("express");
const { param, body, header } = require("express-validator");
const { checkObjectId, validate } = require("../middlewares/validator");
const {
  getAllProducts,
  getSingleProductById,
  findProductByName,
  getProductsCatagory,
  getUpdateQuantityProduct,
  getUpdateQuantityProductinCart,
  getUpdateQuantityProductinCartDelete,
  getUpdateQuantityProductInSearch,
  getUpdateQuantityProductInCatagory,
  getUpdateQuantityProductDetail,
} = require("../controllers/product.controller");
const { loginRequired } = require("../middlewares/authentication");
const router = express.Router();

router.get("/list", getAllProducts);
// router.get("/listall/:id", loginRequired, getUpdateQuantityProduct);

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

router.put(
  "/update/:id",
  loginRequired,
  validate([header("authorization").exists().isString()]),
  getUpdateQuantityProduct
);

router.put(
  "/update/search/:id",
  loginRequired,
  validate([header("authorization").exists().isString()]),
  getUpdateQuantityProductInSearch
);

router.put(
  "/update/catagory/:id",
  loginRequired,
  validate([header("authorization").exists().isString()]),
  getUpdateQuantityProductInCatagory
);

router.put(
  "/update/detail/:id",
  loginRequired,
  validate([header("authorization").exists().isString()]),
  getUpdateQuantityProductDetail
);

router.put(
  "/updateincart/:id",
  loginRequired,
  validate([header("authorization").exists().isString()]),
  getUpdateQuantityProductinCart
);
router.put(
  "/updateincart/delete/:id",
  loginRequired,
  validate([header("authorization").exists().isString()]),
  getUpdateQuantityProductinCartDelete
);

module.exports = router;
