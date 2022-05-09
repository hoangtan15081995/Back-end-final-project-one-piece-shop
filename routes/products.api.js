const express = require("express");
const { getAllProducts } = require("../controllers/product.controller");
const { loginRequired } = require("../middlewares/authentication");
const router = express.Router();

router.get("/getall", loginRequired, getAllProducts);
module.exports = router;
