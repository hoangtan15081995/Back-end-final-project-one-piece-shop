const bcrypt = require("bcryptjs");
const { sendResponse, catchAsync, AppError } = require("../helpers/utils");
const User = require("../models/User");

const userController = {};

userController.register = catchAsync(async (req, res, next) => {
  let { name, email, password } = req.body;

  let user = await User.findOne({ email });

  if (user) {
    throw new AppError(409, "User already exists", "Register Error");
  }

  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(password, salt);

  user = await User.create({
    name,
    email,
    password,
  });

  const accessToken = user.generateToken();

  return sendResponse(
    res,
    200,
    true,
    { user, accessToken },
    null,
    "Create user successful"
  );
});

userController.loginEmailPassword = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  //check input
  const user = await User.findOne({ email }, "+password");

  if (!user) {
    throw new AppError(400, "User not found", "Login Error");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new AppError(400, "Invalid credentials", "Login Error");
  }

  const accessToken = user.generateToken();
  return sendResponse(
    res,
    200,
    { user, accessToken },
    null,
    "Login successful"
  );
});

userController.getCurrentUserProfile = catchAsync(async (req, res, next) => {
  const { currentUserId } = req;
  const currentUser = await User.findById(currentUserId);
  if (!currentUser) {
    throw new AppError(404, "User Not Found", "Get current user error");
  }
  return sendResponse(
    res,
    200,
    currentUser,
    null,
    "Get current user successful"
  );
});

userController.updateCurrentUser = catchAsync(async (req, res, next) => {
  const { currentUserId } = req;
  let user = await User.findById(currentUserId);
  if (!user) {
    throw new AppError(404, "User Not Found", "Get current user error");
  }
  const allows = ["name", "email"];
  allows.forEach((field) => {
    if (req.body[field] !== undefined) {
      user[field] = req.body[field];
    }
  });
  await user.save();
  return sendResponse(res, 200, user, null, " Update profile successful");
});

userController.updatePassword = catchAsync(async (req, res, next) => {
  let { newPassword, confirmPassword } = req.body;
  console.log(newPassword, confirmPassword);
  const { currentUserId } = req;

  let user = await User.findOne(
    { _id: currentUserId, isDeleted: false },
    "+password"
  );
  if (!user) throw new AppError(404, "User not found", "update user error");

  // const allows = ["name", "avatarUrl", "aboutMe"];
  // allows.forEach((field) => {
  //   if (req.body[field] !== undefined) {
  //     user[field] = req.body[field];
  //   }
  // });

  if (newPassword && confirmPassword) {
    const isMatch = await bcrypt.compare(newPassword, user.password);
    if (isMatch)
      throw new AppError(
        400,
        "new password must be differently older password",
        "update user error"
      );

    if (newPassword !== confirmPassword) {
      throw new AppError(
        400,
        "new password and confirm password are not match",
        "update user error"
      );
    } else {
      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash(newPassword, salt);
      user.password = password;
    }
  } else if (newPassword || confirmPassword)
    throw new AppError(
      400,
      "missing info to change password",
      "update user error"
    );

  await user.save();
  return sendResponse(res, 200, true, user, null, "update password successful");
});

userController.deactivateCurrentUser = catchAsync(async (req, res, next) => {
  const { currentUserId } = req;
  //delete password confirm
  await User.findByIdAndUpdate(
    currentUserId,
    { isDeleted: true },
    { new: true }
  );
  return sendResponse(res, 200, {}, null, "Deactivate user successful");
});
module.exports = userController;
