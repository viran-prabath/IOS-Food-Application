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

    if (!food) {
      let errorObj = {
        message: "The given food Id does not exist",
        statusCode: "NOT FOUND",
      };
      return res.status(404).send(errorObj);
    }

    res.status(200).send(food);
  } catch (ex) {
    return res.status(500).send(ex.message);
  }
});

module.exports = foodItemRouter;
