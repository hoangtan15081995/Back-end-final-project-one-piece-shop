const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = Schema(
  {
    userName: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: Number, required: true },
    totalProduct: { type: String, required: true },
    totalQuantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    isDeleted: { type: Boolean, default: false, select: false },
  },
  {
    timestamps: true, //CreatedAt & UpdatedAt
  }
);

const Cart = mongoose.model("Carts", cartSchema);
module.exports = Cart;
