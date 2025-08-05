import jwt from 'jsonwebtoken';
import Cart from '../models/Cart.js';
import CartItem from '../models/CartItem.js';
import Product from '../models/Product.js';

// Middleware (reuse or separate file)
export function isAuthenticated(req, res, next) {
    const token = req.headers?.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}

// Controller
export async function addToCart(req, res) {
    try {
        const userId = req.user.id;
        const { productId, quantity } = req.body;

        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ error: 'Product not found' });

        let cart = await Cart.findOne({ user: userId }).populate('items');

        if (!cart) {
            cart = new Cart({ user: userId, items: [] });
        }

        let existingItem = null;
        for (let itemId of cart.items) {
            const item = await CartItem.findById(itemId);
            if (item && item.product.toString() === productId) {
                existingItem = item;
                break;
            }
        }

        if (existingItem) {
            existingItem.quantity += quantity;
            await existingItem.save();
        } else {
            const newItem = new CartItem({
                product: productId,
                quantity,
                price: product.price
            });
            await newItem.save();
            cart.items.push(newItem._id);
        }

        cart.updatedAt = new Date();
        await cart.save();

        return res.status(200).json({ message: 'Product added to cart', cart });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
    }
}

// Get user's cart
export async function viewCart(req, res) {
    try {
        const userId = req.user.id;

        // Find the cart for the logged-in user
        const cart = await Cart.findOne({ user: userId }).populate({
            path: 'items',
            populate: {
                path: 'product',
                model: 'Product'
            }
        });

        if (!cart || cart.items.length === 0) {
            return res.status(200).json({ message: 'Cart is empty', cart: { items: [], totalPrice: 0 } });
        }

        // Calculate total price
        let totalPrice = 0;
        cart.items.forEach(item => {
            totalPrice += item.price * item.quantity;
        });

        return res.status(200).json({
            message: 'Cart fetched successfully',
            cart: {
                items: cart.items,
                totalPrice
            }
        });

    } catch (err) {
        console.error('Error fetching cart:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
}