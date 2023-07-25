import pgk from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pgk;

const pool = new Pool({
  host: process.env.POSTGRE_HOST,
  port: process.env.POSTGRE_PORT,
  database: process.env.POSTGRE_DATABASE,
  user: process.env.POSTGRE_USER,
  password: process.env.POSTGRE_PASSWORD,
});

export const createTable = async () => {
  await pool.query(`
      CREATE TABLE IF NOT EXISTS products(
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        price NUMERIC(10, 2) NOT NULL,
      )
    `);

  await pool.query(`
      CREATE TABLE IF NOT EXISTS purchases(
        id SERIAL PRIMARY KEY,
        quantity INT NOT NULL,
        price NUMERIC(10, 2) NOT NULL,
        productid INTEGER REFERENCES products(id)
      )
    `);
};

export default pool;
