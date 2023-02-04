const express = require("express");
const manage_user_Router = express.Router();
const bcrypt = require("bcrypt");
const userModel = require("../models/user");

// Insert New User Details
manage_user_Router.post("/", async (req, res) => {
  try {
    let hashData = await bcrypt.genSalt(12);
    let hashedPw = await bcrypt.hash(req.body.password, hashData);
    const user = new userModel({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: hashedPw,
    });

    const newUser = await user.save();
    res.status(200).send("User Insert Successfully!");
  } catch (err) {
    return res.status(500).send(`Error: ${err.message}`);
  }
});


// // Get user details by email & password
// manage_user_Router.get("/userdata/email=:email&password=:password", async (req, res) => {
//   try {
//     let user = await userModel.findOne({
//       email: req.params.email,
//     });
//     if (!user) {
//       let errorObj = {
//         message: "not found"
//       };

//       return res.status(404).send(errorObj);
//     }

//     let pwValid = await bcrypt.compare(req.params.password, user.password);

//     if (!pwValid) return res.status(400).send("Password Incorrect");

//     res.status(200).send(user.userId);
//   } catch (err) {
//     return res.status(500).send(`Error: ${err.message}`);
//   }
// });

// Get user details by email & password
manage_user_Router.post("/userdata", async (req, res) => {
  try {
    let user = await userModel.findOne({
      email: req.body.email,
    });
    if (!user) {
      let errorObj = {
        message: "The given email address does not match in our system",
        statusCode: "NOT FOUND",
      };

      return res.status(404).send(errorObj);
    }

    let pwValid = await bcrypt.compare(req.body.password, user.password);

    if (!pwValid) return res.status(400).send("Password Incorrect");

    return res.status(200).send(user.userId);
  } catch (err) {
    return res.status(500).send(`Error: ${err.message}`);
  }
});

// try {
//   let user = await userModel.findOne({
//     email: req.params.email,
//   });

//   if (!user) return res.status(400).send("NOT_FOUND");

//   let pwValid = await bcrypt.compare(req.params.password, user.password);

//   if (!pwValid) return res.status(400).send("PW_INC");

//   res.status(200).send(user.userId);
// } catch (err) {
//   return res.status(500).send(`Error: ${err.message}`);
// }


module.exports = manage_user_Router;
