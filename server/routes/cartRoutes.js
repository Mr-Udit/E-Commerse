import express from 'express';
import { addToCart, isAuthenticated, viewCart } from '../controllers/cartController.js';

const router = express.Router();

// Add to cart
router.post('/add', isAuthenticated, addToCart);
// get user cart
router.get('/', isAuthenticated, viewCart)
export default router;
