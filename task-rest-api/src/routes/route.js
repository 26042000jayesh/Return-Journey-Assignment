const express = require('express');
const productController = require('../controllers/productController');

const productRouter = express.Router();

productRouter.get('/products',productController.getAllProducts);
productRouter.get('/products/:productId',productController.getProductById);
productRouter.put('/products/:productId',productController.updateProductById);
productRouter.delete('/products/:productId',productController.deleteProductById);
productRouter.post('/products',productController.storeProduct);

module.exports = productRouter;