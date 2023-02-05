const express = require("express");
const foodItemRouter = express.Router();
const foodItemModel = require("../models/food_items");

//Get all food items
foodItemRouter.get("/", async (req, res) => {
  try {
    let food_items = await foodItemModel.find();

    res.status(200).send(food_items);
  } catch (err) {
    return res.status(500).send(`Error: ${err.message}`);
  }
});

// Get food item details by Item Id
foodItemRouter.get("/:foodId", async (req, res) => {
  try {
    let food = await foodItemModel.findOne({
      foodId: req.params.foodId,
    });

    if (!food) return res.status(404).send("Food Item Not Found");

    res.status(200).send(food);
  } catch (ex) {
    return res.status(500).send(ex.message);
  }
});


// Get food item details by cuisine
foodItemRouter.get("/cuisine/:cuisine", async (req, res) => {
  try {
    let food = await foodItemModel.find({
      cuisine: req.params.cuisine,
    });

    if (!food) return res.status(404).send("Cuisine Not Found");

    res.status(200).send(food);
  } catch (ex) {
    return res.status(500).send(ex.message);
  }
});

module.exports = foodItemRouter;
