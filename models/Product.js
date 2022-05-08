const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = Schema(
  {
    productName: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Products", productSchema);
module.exports = Product;
