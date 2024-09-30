import knex from "knex";
import dbConfig from "./knexfile";

const db = knex(dbConfig);

export default db;
