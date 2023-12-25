const InMemoryDB = require("../database/inMemoryDB");
const Product = require('../models/product');


class ProductRepository {
    #dataStorage
    constructor(dataStorage) {
        this.#dataStorage = dataStorage;
    }

    async findAllProducts() {
        return await this.#dataStorage.getAll();
    }

    async findProductById(id) {
        return await this.#dataStorage.getById('id', id);
    }

    async createProduct(product) {
        const productDoc = product instanceof Product ? product : Product.objectToProduct(product);
        await this.#dataStorage.add(productDoc);
        return productDoc;
    }

    async updateProduct(id, payload) {
        const updatedProductDoc = Product.objectToProduct(payload);
        return await this.#dataStorage.update('id', id, updatedProductDoc);
    }

    async deleteProduct(id) {
        await this.#dataStorage.remove('id', id);
    }

    async deleteAllProducts() {
        await this.#dataStorage.clear();
    }

    async clearAll(){
        await this.#dataStorage.clear();
    }
}

const dataStorage = InMemoryDB.getInstance();
const productRepository = new ProductRepository(dataStorage);

module.exports = { productRepository, ProductRepository };