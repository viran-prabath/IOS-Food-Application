const express = require("express");
const async = require("async");
const favFoodRouter = express.Router();
const favFoodModel = require("../models/fav_food_items");
const foodModel = require("../models/food_items");

// Insert favorite food detail
favFoodRouter.post("/", async (req, res) => {
    try {
      //Check mandatory value userId
      if (!req.body.userId) {
        let errorObj = {
          message: "UserId is required.",
          status: "SYSTEM ERROR",
        };
        return res.status(400).send(errorObj);
      }
  
      //Check mandatory value foodId
      if (!req.body.foodId) {
        let errorObj = {
          message: "foodId is required.",
          status: "SYSTEM ERROR",
        };
        return res.status(400).send(errorObj);
      }
  
      //Check food is alredy added
      let checkExistfavFood = await favFoodModel.findOne({
        userId: req.body.userId,
        foodId: req.body.foodId,
      });
  
      if (checkExistfavFood) {
        let errorObj = {
          message: "This food data alredy added.",
          status: "ALREDY EXIST",
        };
        return res.status(400).send(errorObj);
      }
  
      //Insert favorite food data
      let favFood = new favFoodModel({
        userId: req.body.userId,
        foodId: req.body.foodId,
      });
  
      const newFavFood = await favFood.save();
      res.status(200).send(newFavFood);
    } catch (err) {
      return res.status(500).send(`Error: ${err.message}`);
    }
  });


  // Get favorite food details by user id
  favFoodRouter.get("/:userId", async (req, res) => {
    try {

      let favFoodDetails = await favFoodModel
        .find({
          userId: req.params.userId,
        })
        .sort({
          createdDateTime: "desc",
        });
  
      if (favFoodDetails.length === 0) {
        let errorObj = {
          message:
            "The given user does not match any favorite outlet on our system",
          statusCode: "NOT FOUND",
        };
  
        return res.status(404).send(errorObj);
      }
  
      //If has user wise favorite outlet, then get outlet details
      let foodData = await async.map(favFoodDetails, async (food) => {
        return await foodModel
          .findOne({ foodId: food.foodId })
          .select({
            foodId: 1,
            name: 1,
            imageUrl: 1,
          });
      });
  
      if (!foodData) {
        let errorObj = {
          message:
            "The given food outlet Id by favorite list but, does not match any food outlet on our system",
          statusCode: "NOT FOUND",
        };
  
        return res.status(404).send(errorObj);
      }
  
      res.status(200).send(foodOutlets);
    } catch (err) {
      return res.status(500).send(`Error: ${err.message}`);
    }
  });

  // Delete favorite food by userId & foodId
  favFoodRouter.delete("/:userId/:foodId", async (req, res) => {
    try {
      //Check outlet is alredy added in the system
      let checkExistfavFood = await favFoodModel.findOne({
        userId: req.params.userId,
        foodId: req.params.foodId,
      });
  
      if (!checkExistfavFood) {
        let errorObj = {
          message:
            "The given user Id & outlet Id does not match any favorite outlet on our system",
          statusCode: "SYSTEM ERROR : NOT FOUND",
        };
        return res.status(404).send(errorObj);
      }
  
      //Delete favorite outlet
      let deletedFavFood = await favFoodModel.findOneAndDelete({
        userId: req.params.userId,
        foodId: req.params.foodId,
      });
  
      res.status(200).send(deletedFavFood);
    } catch (err) {
      return res.status(500).send(`Error: ${err.message}`);
    }
  });

module.exports = favFoodRouter;
