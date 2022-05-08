const express = require("express");
const router = express.Router();

const userRouter = require("./users.api");
router.use("/users", userRouter);

const cartRouter = require("./carts.api");
router.use("/users", cartRouter);

module.exports = router;
