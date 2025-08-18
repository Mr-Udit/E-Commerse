import jwt from 'jsonwebtoken';
import Cart from '../models/Cart.js';
import CartItem from '../models/CartItem.js';
import Product from '../models/Product.js';

// Middleware
export function isAuthenticated(req, res, next) {
    const token = req.headers?.authorization;
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}

/**
 * Add product to cart (new product only)
 */
export async function addToCart(req, res) {
  try {
    const userId = req.user.id;
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    let cart = await Cart.findOne({ user: userId }).populate("items");
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // 🔍 Check if product already exists in cart
    const existingItem = await CartItem.findOne({
      _id: { $in: cart.items },
      product: productId,
    });

    if (existingItem) {
      return res.status(400).json({
        message: "This product is already in your cart. You can only add it once.",
      });
    }

    // ✅ Add only if it doesn't exist
    const newItem = await CartItem.create({
      product: productId,
      quantity: 1, // always 1, since only one allowed
    });

    cart.items.push(newItem._id);
    await cart.save();

    const updatedCart = await Cart.findOne({ user: userId })
      .populate({
        path: "items",
        populate: { path: "product" },
      });

    return res.status(201).json({
      message: "Item added to cart successfully",
      cart: updatedCart,
    });
  } catch (err) {
    console.error("Error adding to cart:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}




/**
 * Update cart item quantity
 */
export async function updateCartItem(req, res) {
    try {
        const userId = req.user.id;
        const { productId, quantity } = req.body;

        // Find the user's cart
        const cart = await Cart.findOne({ user: userId });
        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        // Find the CartItem in user's cart that matches this product
        const item = await CartItem.findOne({
            _id: { $in: cart.items },
            product: productId
        });

        if (!item) {
            return res.status(404).json({ message: 'Item not found in cart' });
        }

        // Update quantity
        item.quantity = quantity;
        await item.save();
        const usercart = await Cart.findOne({ user: userId }).populate({
            path: 'items',
            populate: { path: 'product', model: 'Product' }
        });

        return res.status(200).json({
            message: 'Cart item updated', cart: {
                id: usercart._id,
                user: usercart.user,
                items: usercart.items,
            }
        });

    } catch (err) {
        console.error('Error updating cart item:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
}


/**
 * View cart
 */
export async function viewCart(req, res) {
    try {
        const userId = req.user.id;

        const cart = await Cart.findOne({ user: userId }).populate({
            path: 'items',
            populate: { path: 'product', model: 'Product' }
        });

        if (!cart || cart.items.length === 0) {
            return res.status(200).json({ message: 'Cart is empty', cart: { items: [], totalPrice: 0 } });
        }

        let totalPrice = 0;
        cart.items.forEach(item => {
            totalPrice += item.price * item.quantity;
        });

        return res.status(200).json({
            cart: {
                id: cart._id,
                user: cart.user,
                items: cart.items,
                totalPrice
            }
        });

    } catch (err) {
        console.error('Error fetching cart:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

/**
 * Delete one item
 */
export async function deleteFromCart(req, res) {
    try {
        const userId = req.user.id;
        const itemId = req.params.id;
        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        // console.log(cart.items)
        const itemIndex = cart.items.indexOf(itemId);
        if (itemIndex === -1) {
            return res.status(404).json({ message: 'Item not found in cart' });
        }
        cart.items.splice(itemIndex, 1);
        await cart.save();
        await CartItem.findByIdAndDelete(itemId);
        return res.status(200).json({ message: 'Item removed from cart', cart });
    } catch (err) {
        console.error('Error deleting item from cart:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

/**
 * Delete all items
 */
export async function deleteAllFromCart(req, res) {
    try {
        const userId = req.user.id;
        const cart = await Cart.findOne({ user: userId });

        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        await CartItem.deleteMany({ _id: { $in: cart.items } });
        cart.items = [];
        await cart.save();

        return res.status(200).json({ message: 'All items removed from cart', cart });

    } catch (err) {
        console.error('Error deleting all items from cart:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
