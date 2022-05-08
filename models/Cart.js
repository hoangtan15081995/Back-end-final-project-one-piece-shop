const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = Schema(
  {
    productName: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    isDeleted: { type: Boolean, default: false, select: false },
  },
  {
    timestamps: true, //CreatedAt & UpdatedAt
  }
);

const Cart = mongoose.model("Carts", cartSchema);
module.exports = Cart;
