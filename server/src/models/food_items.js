const mongoose = require("mongoose");

const food_Schema = new mongoose.Schema({
  foodId: { type: String, required: true, unique: true, maxlength: 10 },
  name: { type: String, required: true, unique: true },
  description: { type: String },
  cuisine: { type: String },
  calories: { type: String },
  carbohydrates: { type: String },
  fat: { type: String },
  protein: { type: String },
  sugar: { type: String },
  ingredient: { type: String },
  imageUrl: { type: String, required: true },
  isActive: { type: Boolean, required: true, default: true },
  createdDateTime: { type: Date, default: Date.now() },
});
const foodItem = mongoose.model("food_item", food_Schema);
module.exports = foodItem;
