import express from "express";
import {
  addProducts,
  deleteProduct,
  getAllProducts,
} from "../controllers/products-controller.js";

const productRouter = express.Router();

productRouter.get("/products", getAllProducts);
productRouter.post("/products", addProducts);
productRouter.delete("/products/:id", deleteProduct);

export default productRouter;
