import express from "express";
import {
  getProductById,
  saveProduct,
} from "../controllers/products-controller.js";

const productRouter = express.Router();

productRouter.post("/products", saveProduct);
productRouter.get("/products/{productId}", getProductById);
// productRouter.delete("/products/:id", deleteProduct);

export default productRouter;
