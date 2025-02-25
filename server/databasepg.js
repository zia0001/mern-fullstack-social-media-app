import dotenv from "dotenv";
dotenv.config();  // ✅ Load environment variables

import pkg from "pg";  // ✅ Import the entire package
const { Pool } = pkg;  // ✅ Extract Pool

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT, // Usually 5432
});

export default pool;
