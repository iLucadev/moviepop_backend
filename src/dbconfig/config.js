import dotenv from "dotenv";
dotenv.config();

/**
 * Exports database keys stored in the .env. This way the sensitive
 * data remains private.
 */
export default {
  host: process.env.HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
};
