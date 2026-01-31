const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Database Successfully Connected");
  })
  .catch((err) => {
    console.log("Database Connection Failed");
    console.log(err);
  });
