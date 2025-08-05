import Product from '../models/Product.js';
import { uploadToCloudinary, removeFromCloudinary } from '../utils/cloudinary.js';

export async function createProduct(req, res) {
    try {
        const { name, description, price, categorie, brand, stock } = req.body;

        const imageUploadPromises = req.files.map(file => uploadToCloudinary(file.path));
        const images = await Promise.all(imageUploadPromises);

        const product = new Product({
            name,
            description,
            price,
            categories: categorie,
            brand,
            stock,
            images
        });

        await product.save();
        res.status(201).json({ message: 'Product created successfully', product });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export async function listProducts(req, res) {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export async function getProductDetails(req, res) {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ error: 'Product not found' });
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export async function updateProduct(req, res) {
    try {
        const updates = req.body;
        updates.updatedAt = new Date();
        const product = await Product.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
        if (!product) return res.status(404).json({ error: 'Product not found' });
        res.json(product);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

export async function deleteProduct(req, res) {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ error: 'Product not found' });

        for (const image of product.images) {
            await removeFromCloudinary(image.public_id);
        }

        await product.deleteOne();
        res.json({ message: 'Product deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
