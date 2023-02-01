const mongoose = require("mongoose");

const fav_Food_Schema = new mongoose.Schema({
  userId: { type: String, required: true },
  foodId: { type: String, required: true },
  createdDateTime: { type: Date, default: Date.now() },
});

// Create an instance of model favorite food outlet
const favFoodItems = mongoose.model("fav_food", fav_Food_Schema);

module.exports = favFoodItems;