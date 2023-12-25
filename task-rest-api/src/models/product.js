const uuid = require('uuid');

class Product {

    constructor(name, description, price, category, id = uuid.v4()) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.category = category ;
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    getDescription() {
        return this.description;
    }

    getPrice() {
        return this.price;
    }

    getCategory() {
        return this.category;
    }

    static objectToProduct(object) {
        return new Product(object.name, object.description, object.price,object.category);
    }
}

module.exports = Product;
