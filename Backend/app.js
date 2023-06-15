const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/user-routes");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use("/api", router);

mongoose
  .connect(
    "mongodb+srv://Miten:MiHaKrRa88@projects.hpzcfyg.mongodb.net/auth?retryWrites=true&w=majority "
  )
  .then(() => {
    app.listen(5000);
    console.log("Database connection established! listening on port 5000");
  })
  .catch((error) => {
    console.log(error);
  });
