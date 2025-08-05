import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    // Skip token validation for /register, /verify-email, and /forgot-password routes
    const skipAuthRoutes = ['/register', '/login' ,'/verify-email', '/forgot-password','/reset-password'];
    if (skipAuthRoutes.includes(req.path)) {
        return next();
    }

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};


export default authMiddleware;