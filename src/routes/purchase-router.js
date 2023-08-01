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
purchaseRouter.get("/purchases/:productId/quantity", getProductQuantitiy);
purchaseRouter.get("/purchases/:productId/average-price", getAveragePrice);
purchaseRouter.get("/purchases/:productId/profit", getProductProfit);
purchaseRouter.get("/purchases/fewest", getFewest);
purchaseRouter.get("/purchases/popular", getPopular);

export default purchaseRouter;
