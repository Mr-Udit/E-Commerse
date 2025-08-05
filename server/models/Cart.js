import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CartItem'
    }],
    updatedAt: {
        type: Date,
        default: Date.now
    },
    totalPrice: {
        type: Number,
        default: 0
    }
});

// Pre-save hook to calculate totalPrice
cartSchema.pre('save', async function (next) {
    try {
        // Populate CartItems
        await this.populate('items');

        // Calculate total price from populated CartItems
        this.totalPrice = this.items.reduce((acc, item) => acc + (item.totalPrice || 0), 0);
        this.updatedAt = Date.now();

        next();
    } catch (err) {
        next(err);
    }
});

export default mongoose.model('Cart', cartSchema);
