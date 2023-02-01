const dotenv = require("dotenv");
const app = require("./server/app")

// Config .env
dotenv.config();

// Define a PORT
const PORT = process.env.APP_RUNNING_PORT || 3000;

// Check runing port
app.listen(PORT, () => {
  console.log(`Successfully runing on Port : ${PORT}`);
});



