import pool from "../config/sql.js";

export const saveProduct = async (req, res) => {
  try {
    const { title, price } = req.body;

    const query =
      "INSERT INTO products(title, price) VALUES($1, $2) RETURNING *";
    const values = [title, price];

    const result = await pool.query(query, values, (err, result) => {
      if (err) {
        console.error("Error inserting data:", err);
        return res.status(500).json({ error: "Error inserting data" });
      }
    });
    console.log(result);
    res.status(201).json({ id: result.rows[0].id, name, price });
  } catch (err) {
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
    res.status(500).json({ error: "Internal server error" });
  }
};
