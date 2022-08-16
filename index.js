import app from "./src/app.js";
import database from "./src/dbconfig/database.js";

//Listen to
app.listen(app.get("port"), () => {
  console.log("Server running on port " + app.get("port"));
});
