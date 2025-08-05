import express from 'express';
import {
    createProduct,
    deleteProduct,
    updateProduct,
    listProducts,
    getProductDetails
} from '../controllers/productController.js';
import { productMiddleware } from '../middleware/productMiddleware.js';
import upload from '../middleware/multer.js';

const router = express.Router();

router.post('/', ...productMiddleware('create'), upload.array('images', 5), createProduct);
router.get('/', ...productMiddleware('list'), listProducts);
router.get('/:id', ...productMiddleware('view'), getProductDetails);
router.put('/:id', ...productMiddleware('edit'), updateProduct);
router.delete('/:id', ...productMiddleware('delete'), deleteProduct);

export default router;
