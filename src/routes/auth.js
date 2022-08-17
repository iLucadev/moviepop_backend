import { Router } from "express";
import connection from "../dbconfig/database.js";
import helpers from "../utils/helpers.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const router = Router();

router.get("/isAuth", (req, res, next) => {
  const accessToken = req.header("jwt");

  !accessToken
    ? res.status(400).json({ message: "Invalid token" })
    : jwt.verify(accessToken, process.env.JWT_SECRET, (err, decoded) => {
        err
          ? res
              .status(400)
              .json({ auth: false, message: "Failed to authenticate" })
          : res.status(200).json({
              auth: true,
              message: "Authentication completed",
              decoded,
            });
        next();
      });
});

router.post("/signup", async (req, res) => {
  const { user_first_name, user_last_name, user_password, user_email } =
    req.body;

  const newUser = {
    user_first_name,
    user_last_name,
    user_password,
    user_email,
  };

  newUser.user_password = await helpers.encryptPassword(user_password);

  connection.query(
    //First we make sure the user does not already exists in the db
    `CALL get_user_by_email(?)`,
    [user_email],
    (err, rows) => {
      err ? res.status(204).send(err) : res.status(200);
      //If the response array length is more than 0, there is a user with that email
      rows.length != 0
        ? res.status(303).json({ message: "User already exists!" })
        : //If not, then insert the user in the db.
          connection.query(
            `INSERT INTO users set ?`,
            [newUser],
            (err, rows) => {
              err ? res.status(204).send(err) : res.status(200).json(rows);
            }
          );
    }
  );
});

router.post("/login", async (req, res) => {
  const { user_password, user_email } = req.body;

  !user_email || !user_password
    ? res.status(400).json({ message: "Empty field: email or password" })
    : await connection.query(
        `CALL get_user_by_email(?)`,
        [user_email],
        async (err, rows) => {
          if (
            rows.length == 0 ||
            (await helpers.matchPassword(user_password, rows[0].user_password))
          ) {
            res.status(400).json({ message: "Wrong field: email or password" });
          } else {
            const id = rows[0].user_id;
            const token = jwt.sign({ id: id }, process.env.JWT_SECRET, {
              expiresIn: process.env.JWT_EXPIRES,
            });

            const cookiesOptions = {
              expires: new Date(
                Date.now() +
                  process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
              ),
            };
            res
              .status(200)
              .cookie("jwt", token, cookiesOptions)
              .json({ token, user_password, user_email });
          }
        }
      );
});

export default router;
