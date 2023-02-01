const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const serverless = require("serverless-http");

//Config .env
dotenv.config();

// Crete a Express Framework
const app = express();

// Declare a PORT
const PORT = process.env.APP_RUNNING_PORT || 3000;

//Add Routes
const foodItemRouter = require("./src/routes/manage_food_items");
const favFoodRouter = require("./src/routes/manage_fav_food_items");
const UserManageRouter = require("./src/routes/manage_user");

app.use(cors());
app.use(express.json());
app.use("/api/foods", foodItemRouter);
app.use("/api/favorites", favFoodRouter);
app.use("/api/user", UserManageRouter);


// Check runing port
app.listen(PORT, () => {
  console.log(`Successfully runing on Port : ${PORT}`);
});

// Mongo DB Connections
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_DB_CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Successfully connected to mongodb !"))
  .catch((err) => console.log(`Error has occured: ${err}`));

module.exports = app;
module.exports.handler = serverless(app);
