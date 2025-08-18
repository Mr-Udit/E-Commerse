import Product from '../models/Product.js';
import { uploadToCloudinary, deleteFromCloudinary } from '../utils/cloudinary.js';

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

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, categories, brand, stock, imagesToDelete } = req.body;

        let product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // 🗑 Delete selected images from Cloudinary & DB
        if (imagesToDelete && Array.isArray(imagesToDelete)) {
            for (const public_id of imagesToDelete) {
                await deleteFromCloudinary(public_id); // delete from Cloudinary
                product.images = product.images.filter(img => img.public_id !== public_id); // remove from DB
            }
        }

        // 📤 Add new uploaded images to product
        if (req.files && req.files.length > 0) {
            const uploadedImages = [];
            for (const file of req.files) {
                const result = await uploadToCloudinary(file.path, "products");
                uploadedImages.push({
                    url: result.secure_url,
                    public_id: result.public_id
                });
            }
            product.images.push(...uploadedImages);
        }

        // 📝 Update other fields if provided
        if (name) product.name = name;
        if (description) product.description = description;
        if (price) product.price = price;
        if (categories) product.categories = categories;
        if (brand) product.brand = brand;
        if (stock !== undefined) product.stock = stock;

        product.updatedAt = Date.now();

        await product.save();
        res.status(200).json({
            message: "Product updated successfully",
            product
        });

    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ message: "Server error" });
    }
};

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
