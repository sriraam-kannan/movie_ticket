import dotenv from "dotenv";

dotenv.config();

const dbConfig = {
  client: "pg",
  connection: process.env.DB_URL,
};
console.log("dbConfig", dbConfig);
export default dbConfig;
