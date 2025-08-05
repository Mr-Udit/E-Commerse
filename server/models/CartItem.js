import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    },
    price: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true,
        default: function() {
            return this.quantity * this.price;
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('CartItem', cartItemSchema);
