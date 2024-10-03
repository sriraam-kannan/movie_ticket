import dotenv from "dotenv";

dotenv.config();

const dbConfig = {
  client: "pg",
  connection: {
    connectionString: process.env.DB_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  },
};
export default dbConfig;
