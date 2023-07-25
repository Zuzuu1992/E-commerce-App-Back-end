import pool from "../config/sql.js";

export const getAllProducts = async (req, res) => {
  try {
    const resultQuery = await pool.query("SELECT * FROM products");
    const rows = resultQuery.rows;
    return res.status(200).json(rows);
  } catch (error) {
    return res.status(401).json(error);
  }
};

export const addProducts = async (req, res) => {
  const { title, price, quantity } = req.body;
  try {
    const resultQuery = await pool.query(
      "INSERT INTO products(title, price, quantity)VALUES($1, $2, $3)",
      [title, price, quantity]
    );
    const rows = resultQuery.rows;
    return res.status(200).json(rows);
  } catch (error) {
    return res.status(401).json(error);
  }
};

export const deleteProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const resultQuery = await pool.query("DELETE FROM products WHERE id = $1", [
      id,
    ]);
    return res.status(200).json({ message: "Product deleted!" });
  } catch (error) {
    return res.status(401).json(error);
  }
};
