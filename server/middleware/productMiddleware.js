import jwt from 'jsonwebtoken';
import User from '../models/User.js';
export function isAuthenticated(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
        req.user = null;
        return next();
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}

export async function isAdmin(req, res, next) {
    const user = await User.findById(req.user.id).select('role');
    console.log(user);
    if (req.user && user.role === 'admin') return next();
    return res.status(403).json({ message: 'Admin access required' });
}

function allowGuest(req, res, next) {
    next();
}

export function productMiddleware(action) {
    const guestActions = ['list', 'view'];
    const adminActions = ['create', 'edit', 'delete'];

    if (guestActions.includes(action)) return [isAuthenticated, allowGuest];
    if (adminActions.includes(action)) return [isAuthenticated, isAdmin];
    return [isAuthenticated];
}
