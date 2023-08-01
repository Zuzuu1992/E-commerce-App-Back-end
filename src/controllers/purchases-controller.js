import pool from "../config/sql.js";

export const purchaseProduct = async (req, res) => {
  try {
    const { quantity, price, productid } = req.body;
    const query =
      "INSERT INTO purchases (quantity, price, productid) VALUES ($1, $2, $3)";
    const values = [quantity, price, productid];
    await pool.query(query, values);
    res.status(201).json({ message: "Purchase successful" });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getProductQuantitiy = async (req, res) => {
  try {
    const productId = req.params.productId;
    const query =
      "SELECT SUM(quantity) AS total_quantity FROM purchases WHERE productid = $1";
    const result = await pool.query(query, [productId]);
    const totalQuantity = result.rows[0].total_quantity || 0;
    res.json({ productid: productId, total_quantity: totalQuantity });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAveragePrice = async (req, res) => {
  try {
    const productId = req.params.productId;
    const query =
      "SELECT AVG(price) AS average_price FROM purchases WHERE productid = $1";
    const result = await pool.query(query, [productId]);
    const averagePrice = result.rows[0].average_price || 0;
    res.json({ productid: productId, average_price: averagePrice });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getProductProfit = async (req, res) => {
  try {
    const productId = req.params.productId;
    const query =
      "SELECT SUM(quantity * price) AS total_profit FROM purchases WHERE productid = $1";
    const result = await pool.query(query, [productId]);
    const totalProfit = result.rows[0].total_profit || 0;
    res.json({ productid: productId, total_profit: totalProfit });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getFewest = async (req, res) => {
  try {
    console.log("nihau");
    const query =
      "SELECT productid, SUM(quantity) AS total_quantity FROM purchases GROUP BY productid ORDER BY total_quantity ASC LIMIT 1";
    const result = await pool.query(query);
    console.log("konishua");
    if (result.rows.length === 0) {
      res.status(404).json({ error: "No products found" });
    } else {
      res.json(result.rows[0]);
    }
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getPopular = async (req, res) => {
  try {
    console.log("nihau");
    const query =
      "SELECT productid, SUM(quantity) AS total_quantity FROM purchases GROUP BY productid ORDER BY total_quantity DESC LIMIT 1";
    const result = await pool.query(query);
    console.log("konishua");
    if (result.rows.length === 0) {
      res.status(404).json({ error: "No products found" });
    } else {
      res.json(result.rows[0]);
    }
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};
