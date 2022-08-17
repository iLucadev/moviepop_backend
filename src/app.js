import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import mysql from "mysql";
import config from "./dbconfig/config.js";
import users from "./routes/users.js";
import auth from "./routes/auth.js";

//Initialize app
const app = express();

//Settings
app.set("port", process.env.PORT || 5000);

//Middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

//Routes
app.use(auth);
app.use(users);

//Testing
app.get("/", (req, res) => {
  res.send("Hey there!");
});

export default app;
