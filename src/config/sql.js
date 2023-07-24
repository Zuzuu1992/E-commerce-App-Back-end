import pgk from "pg";

const { Pool } = pgk;

const pool = new Pool({
  host: "dpg-civ89n5iuiedpv15vjrg-a",
  port: "5432",
  database: "e_commerce_app_rjct",
  user: "e_commerce_app_rjct_user",
  password: "QSNCu65ib0fTgrtuCFBFFXXwzhWO8fFL",
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
