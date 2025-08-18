import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js'; // Assuming you have a User model defined

const router = express.Router();

// Middleware to check authentication
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
// Controller to get user details
export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            phone: user.phone,
            gender: user.gender,
            dateOfBirth: user.dateOfBirth,
            verified: user.verified,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Define the route for getting user details
router.get('/', isAuthenticated, getUser);

export default router;
