const CustomErrorHandler = require('../services/CustomErrorHandler');
const Product = require('../models/product');
const { productRepository } = require('../repositories/productRepository');
const Joi = require('joi');

const paramCheckSchema = Joi.object({
    productId: Joi.string().uuid()
});

const ProductSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    category: Joi.string().required(),
});

const productController = {

    async storeProduct(req, res, next) {
        try {
            const { error } = ProductSchema.validate(req.body);
            if (error) {
                return next(error);
            }
            const { name, description, price, category } = req.body;
            const productDoc = Product.objectToProduct({ name, description, price, category });
            await productRepository.createProduct(productDoc);
            return res.status(201).json(productDoc);
        } catch (error) {
            return next(CustomErrorHandler.serverError(error.message));
        }
    },

    async getAllProducts(req, res, next) {
        try {
            let allProducts = await productRepository.findAllProducts();
            return res.status(200).json(allProducts);
        } catch (error) {
            return next(CustomErrorHandler.serverError(error.message));
        }
    },

    async getProductById(req, res, next) {
        try {
            const productId = req.params.productId;
            const { error } = paramCheckSchema.validate({ productId });
            if (error) {
                return next(error);
            }
            let product = await productRepository.findProductById(productId);
            if (!product) {
                return next(CustomErrorHandler.notFound());
            }
            return res.status(200).json(product);
        } catch (error) {
            return next(CustomErrorHandler.serverError(error.message));
        }
    },

    async updateProductById(req, res, next) {
        try {
            const productId = req.params.productId;
            let error = paramCheckSchema.validate({ productId }).error;
            if (error) {
                return next(error);
            }
            error = ProductSchema.validate(req.body).error;
            if (error) {
                return next(error);
            }
            const { name, description, price, category } = req.body;
            let product = await productRepository.findProductById(productId);
            if (!product) {
                return next(CustomErrorHandler.notFound());
            }
            const updatedProductDocument = await productRepository.updateProduct(productId, { name, description, price, category });
            return res.status(200).json(updatedProductDocument);
        } catch (error) {
            return next(CustomErrorHandler.serverError(error.message));
        }
    },

    async deleteProductById(req, res, next) {
        try {
            const productId = req.params.productId;
            const { error } = paramCheckSchema.validate({ productId });
            if (error) {
                return next(error);
            }
            let product = await productRepository.findProductById(productId);
            if (!product) {
                return next(CustomErrorHandler.notFound());
            }
            product = await productRepository.deleteProduct(productId);
            return res.status(204).json(product);
        } catch (error) {
            return next(CustomErrorHandler.serverError(error.message));
        }
    }
}

module.exports = productController;
