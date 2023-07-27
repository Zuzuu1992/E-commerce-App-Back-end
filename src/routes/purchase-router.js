import express from "express";
import {
  getAveragePrice,
  getFewest,
  getPopular,
  getProductProfit,
  getProductQuantitiy,
  purchaseProduct,
} from "../controllers/purchases-controller.js";

const purchaseRouter = express.Router();

purchaseRouter.post("/purchases", purchaseProduct);
purchaseRouter.get("/products/:productId/quantity", getProductQuantitiy);
purchaseRouter.get("/products/:productId/average-price", getAveragePrice);
purchaseRouter.get("/products/:productId/profit", getProductProfit);
purchaseRouter.get("/products/fewest", getFewest);
purchaseRouter.get("/products/popular", getPopular);

export default purchaseRouter;
