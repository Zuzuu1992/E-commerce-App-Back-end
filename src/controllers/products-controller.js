import pool from "../config/sql.js";

// export const getAllProducts = async (req, res) => {
//   try {
//     const resultQuery = await pool.query("SELECT * FROM products");
//     const rows = resultQuery.rows;
//     return res.status(200).json(rows);
//   } catch (error) {
//     return res.status(401).json(error);
//   }
// };

// export const addProducts = async (req, res) => {
//   const { title, price, quantity } = req.body;
//   try {
//     const resultQuery = await pool.query(
//       "INSERT INTO products(title, price, quantity)VALUES($1, $2, $3)",
//       [title, price, quantity]
//     );
//     const rows = resultQuery.rows;
//     return res.status(200).json(rows);
//   } catch (error) {
//     return res.status(401).json(error);
//   }
// };

// export const deleteProduct = async (req, res) => {
//   const id = req.params.id;
//   try {
//     const resultQuery = await pool.query("DELETE FROM products WHERE id = $1", [
//       id,
//     ]);
//     return res.status(200).json({ message: "Product deleted!" });
//   } catch (error) {
//     return res.status(401).json(error);
//   }
// };

export const saveProduct = async (req, res) => {
  try {
    const { name, price } = req.body;
    const query =
      "INSERT INTO products (name, price) VALUES ($1, $2) RETURNING id";
    const values = [name, price];
    const result = await pool.query(query, values);
    res.status(201).json({ id: result.rows[0].id, name, price });
  } catch (err) {
    console.error("Error saving product:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getProductById = async (req, res) => {
  try {
    const productId = req.params.productId;
    const query = "SELECT * FROM products WHERE id = $1";
    const result = await pool.query(query, [productId]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: "Product not found" });
    } else {
      res.json(result.rows[0]);
    }
  } catch (err) {
    console.error("Error getting product by ID:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
