import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js';
import authMiddleware from './middleware/authMiddleware.js';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
dotenv.config();
const app = express();

app.use(express.json());
app.use('/api/auth', authMiddleware, authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT || 5000, () => console.log('Server running'));
  })
  .catch(err => console.error(err));