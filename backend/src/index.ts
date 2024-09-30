import express from "express";
import knex from "knex";
import dbConfig from "./database/knexfile";
import appRoutes from "./appRoutes";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const db = knex(dbConfig);

app.use(express.json());

app.use("/api", appRoutes);

app.get("/healthCheck", async (req, res) => {
  res.status(200).send({
    message: "Service is up and running!!",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
