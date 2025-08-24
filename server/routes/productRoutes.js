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

//  upload.array('images', 5),
// , ...productMiddleware('create')
router.post('/add', ...productMiddleware('create'), createProduct);
router.get('/get', ...productMiddleware('list'), listProducts);
router.get('/view/:id', ...productMiddleware('view'), getProductDetails);
router.put('/update/:id', ...productMiddleware('edit'), updateProduct);
router.delete('/delete/:id', ...productMiddleware('delete'), deleteProduct);

export default router;
