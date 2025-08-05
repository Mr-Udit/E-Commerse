import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    categories: { type: String, required: true },
    brand: { type: String, required: true },
    stock: { type: Number, default: 0 },
    images: [{ url: String, public_id: String }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Product', productSchema);
