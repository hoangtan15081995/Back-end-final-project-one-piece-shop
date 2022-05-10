const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = Schema(
  {
    owner: { type: mongoose.Types.ObjectId, ref: "Users" },
    products: [
      {
        product: { type: mongoose.Types.ObjectId, ref: "Products" },
        quantity: { type: Number, default: 0 },
      },
    ],
    phone: { type: Number, require: true },
    address: { type: Object, require: true },
    totalPrice: { type: Number, require: true },
    status: { type: String, default: "pending" },
  },
  {
    timestamps: true, //CreatedAt & UpdatedAt
  }
);

const Order = mongoose.model("Orders", orderSchema);
module.exports = Order;
