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

router.get(
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
  validate([header("authorization").exists().isString()]),
  loginEmailPassword,
  getCurrentUserProfile
);

router.put("/me/update", loginRequired, updateCurrentUser);

router.put("/me/updatepassword", loginRequired, updatePassword);

router.delete("/me/deactivate", loginRequired, deactivateCurrentUser);

module.exports = router;
