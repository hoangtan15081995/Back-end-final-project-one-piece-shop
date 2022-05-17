const express = require("express");
const {
  register,
  loginEmailPassword,
  getCurrentUserProfile,
  updateCurrentUser,
  updatePassword,
  deactivateCurrentUser,
} = require("../controllers/user.controller");
const { validate } = require("../middlewares/validator");
const { body, param, header } = require("express-validator");
const { loginRequired } = require("../middlewares/authentication");
const router = express.Router();

router.post(
  "/register",
  validate([
    body("name", "Invalid name").exists().notEmpty(),
    body("email", "Invalid email").exists().isEmail(),
    body("password", "Invalid password").exists().notEmpty(),
  ]),
  register
);

router.post(
  "/login",
  validate([
    body("email", "Invalid email").exists().isEmail(),
    body("password", "Invalid password").exists().notEmpty(),
  ]),
  loginEmailPassword
);

router.get(
  "/me/get",
  loginRequired,
  validate([header("authorization").exists().isString()]),
  getCurrentUserProfile
);

router.put(
  "/me/update",
  loginRequired,
  validate([header("authorization").exists().isString()]),
  updateCurrentUser
);

router.put(
  "/me/updatepassword",
  loginRequired,
  validate([header("authorization").exists().isString()]),
  updatePassword
);

router.delete(
  "/me/deactivate",
  loginRequired,
  validate([header("authorization").exists().isString()]),
  deactivateCurrentUser
);

module.exports = router;
