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
        price DECIMAL(10, 2) NOT NULL,
        quantity INT NOT NULL
      )
    `);

  await pool.query(`
      CREATE TABLE IF NOT EXISTS orders(
        id SERIAL PRIMARY KEY,
        product_id INT NOT NULL,
        quantity INT NOT NULL,
        order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (product_id) REFERENCES products(id)
      )
    `);
};

export default pool;
