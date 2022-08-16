import express from "express";
import dotenv from "dotenv";

//Initialize app
const app = express();

//Settings
app.set("port", process.env.PORT || 4000);

//Listen to
app.listen(app.get("port"), () => {
  console.log("Server running on port " + app.get("port"));
});
