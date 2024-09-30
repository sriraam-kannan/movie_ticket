// database/knexfile.ts
import { config } from "dotenv";

config(); // Load environment variables

const dbConfig = {
  client: "pg",
  connection: process.env.DB_URL,
};

export default dbConfig;
