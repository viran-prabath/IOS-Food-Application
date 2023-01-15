const mongoose = require("mongoose");

const food_Schema = new mongoose.Schema({
  foodId: { type: String, required: true, unique: true, maxlength: 10 },
  name: { type: String, required: true, unique: true },
  description: { type: String },
  nutrition: { type: Array, default: [] },
  category: { type: Array, default: [] },
  ingredient: { type: Array, default: [] },
  imageUrl: { type: String, required: true },
  isActive: { type: Boolean, required: true, default: true },
  createdDateTime: { type: Date, default: Date.now() },
});
const foodItem = mongoose.model("food_item", food_Schema);
module.exports = foodItem;
