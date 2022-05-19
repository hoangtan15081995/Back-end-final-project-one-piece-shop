const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = Schema({
  productName: { type: String, required: true, unique: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  catagories: { type: String, required: true, enum: ["clock", "T-shirt"] },
  totalProducts: { type: Number, required: true },
  description: { type: String, required: true },
});
productSchema.index({ productName: "text", description: "text" });

const Product = mongoose.model("Products", productSchema);
module.exports = Product;
