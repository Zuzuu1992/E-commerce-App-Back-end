import express from "express";
import {
  addProducts,
  deleteProduct,
  getAllProducts,
  getProductById,
  saveProduct,
} from "../controllers/products-controller.js";

const productRouter = express.Router();

productRouter.post("/products", saveProduct);
productRouter.get("/products", getProductById);
// productRouter.delete("/products/:id", deleteProduct);

export default productRouter;
