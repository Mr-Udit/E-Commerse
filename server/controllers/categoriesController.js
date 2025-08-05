import Category from '../models/Category.js';

// Create a new category (admin only)
export async function createProductCategory(req, res) {
    try {
        const { name, description } = req.body;
        const category = new Category({ name, description });
        await category.save();
        res.status(201).json(category);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

// Get product categories
export async function listProductCategories(req, res) {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Update a categorie by ID
export async function updateCategorie(req, res) {
    try {
        const product = await Category.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!product) return res.status(404).json({ error: 'categorie not found' });
        res.send("categorie updated successfully").json(product);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}
// Delete a categorie by ID
export async function deleteCategorie(req, res) {
    try {
        const product = await Category.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ error: 'categorie not found' });
        res.json({ message: 'categorie deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}