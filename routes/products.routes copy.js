import express from 'express';
import {
  getProducts,
  postProduct,
  productForm,
} from '../controller/products.controller.js';

const router = express.Router();

router.get('/products', productForm);
router.get('/products', getProducts);
router.post('/products', postProduct);

export default router;
