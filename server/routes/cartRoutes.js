import express from "express";
import {
  isAuthenticated,
  addToCart,
  updateCartItem,
  viewCart,
  deleteFromCart,
  deleteAllFromCart
} from "../controllers/cartController.js";

const router = express.Router();

router.post("/add", isAuthenticated, addToCart);
router.put("/update", isAuthenticated, updateCartItem);
router.get("/view", isAuthenticated, viewCart);
router.delete("/delete/:id", isAuthenticated, deleteFromCart);
router.delete("/deleteAll", isAuthenticated, deleteAllFromCart);

export default router;
