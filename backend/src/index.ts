// index.ts
import express from "express";
import knex from "knex";
import dbConfig from "./database/knexfile";
import appRoutes from "./appModules/appRoutes";
import { config } from "dotenv";

// Load environment variables
config();

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Knex
const db = knex(dbConfig);

// Middleware
app.use(express.json());

// Use app routes
app.use("/api", appRoutes(db));

app.get("/healthCheck", async (req, res) => {
  res.status(500).send({
    message: "Error retrieving data!",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
