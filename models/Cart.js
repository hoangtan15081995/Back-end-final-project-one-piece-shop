const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = Schema(
  {
    items: [
      {
        product: { type: mongoose.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, default: 0 },
      },
    ],
    owner: { type: mongoose.Types.ObjectId, ref: "User" },
    isDeleted: { type: Boolean, default: false, select: false },
  },
  {
    timestamps: true, //CreatedAt & UpdatedAt
  }
);

const Cart = mongoose.model("Carts", cartSchema);
module.exports = Cart;
