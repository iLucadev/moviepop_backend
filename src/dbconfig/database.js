import mysql from "mysql";
import config from "./config.js";

const connection = mysql.createConnection(config);

connection.connect((error) => {
  error ? console.error(error) : console.log("Database connected!");
});

export default connection;
