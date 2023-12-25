const Product = require("../../src/models/product");
const request = require('supertest');
const uuid = require('uuid');
const { productRepository } = require('../../src/repositories/productRepository');
const app = require('../../src/app');

beforeEach(() => {
    productRepository.clearAll();
})


describe("GET /api/products", () => {

    it('returns 0 products when application starts', async () => {
        const response = await request(app).get('/api/products')
        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(0);
    });

    it('return stored products from the database', async () => {
        await productRepository.createProduct(new Product('Product 1', 'Description for Product 1', 30, 'Category A'))
        await productRepository.createProduct(new Product('Product 2', 'Description for Product 2', 30, 'Category B'))
        await productRepository.createProduct(new Product('Product 3', 'Description for Product 3', 30, 'Category C'))
        const response = await request(app).get('/api/products')
        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(3);
    })

})


describe("GET /api/products/:productId", () => {

    it('returns 404 when product not found', async () => {
        const response = await request(app).get(`/api/products/${uuid.v4()}`)
        expect(response.status).toBe(404);
    });

    it('returns 400 when productId is invalid', async () => {
        const response = await request(app).get(`/api/products/invalid-productid`)
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            "message": "\"productId\" must be a valid GUID"
        })
    });

    it('return found products from the database', async () => {
        const product = await productRepository.createProduct(new Product('Product 1', 'Description for Product 1', 30, 'Category A'))
        await productRepository.createProduct(new Product('Product 2', 'Description for Product 2', 30, 'Category B'))
        await productRepository.createProduct(new Product('Product 3', 'Description for Product 3', 30, 'Category C'))
        const response = await request(app).get(`/api/products/${product.getId()}`)
        expect(response.status).toBe(200);
        expect(response.body).toEqual(product);
    })

})


describe('POST /api/products', () => {
    it('store new product', async () => {
        const product = {
            name: 'Product 1',
            description: 'Description for Product 1',
            price: 29.99,
            category: 'Category A'
        }
        const response = await request(app).post(`/api/products`).send(product);
        expect(response.status).toBe(201);
        expect(uuid.validate(response.body.id)).toBeTruthy();
        const allProducts = await productRepository.findAllProducts();
        expect(allProducts.length).toEqual(1);
    })

    it('return 400 when name is missing in payload', async () => {
        const product = {
            description: 'Description for Product 1',
            price: 29.99,
            category: 'Category A'
        }
        const response = await request(app).post(`/api/products`).send(product);
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            "message": "\"name\" is required"
        })
    });

    it('return 400 when description is missing in payload', async () => {
        const product = {
            name: 'Product 1',
            price: 29.99,
            category: 'Category A'
        }
        const response = await request(app).post(`/api/products`).send(product);
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            "message": "\"description\" is required"
        })
    });

    it('return 400 when price is missing in payload', async () => {
        const product = {
            name: 'Product 1',
            description: 'Description for Product 1',
            category: 'Category A'
        }
        const response = await request(app).post(`/api/products`).send(product);
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            "message": "\"price\" is required"
        })
    });

    it('return 400 when category is missing in payload', async () => {
        const product = {
            name: 'Product 1',
            description: 'Description for Product 1',
            price: 29.99,
        }
        const response = await request(app).post(`/api/products`).send(product);
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            "message": "\"category\" is required"
        })
    });

    it('return 400 when price contains other datatypes other than number', async () => {
        const product = {
            name: 'Product 1',
            description: 'Description for Product 1',
            price: "29.99 eohf",
            category: 'Category A'
        }
        const response = await request(app).post(`/api/products`).send(product);
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            "message": "\"price\" must be a number"
        })
    });
})


describe("PUT /api/products/:productId", () => {

    it('returns 404 when product does not exist', async () => {
        const updatedProduct = {
            name: 'Updated Product 1',
            description: 'Description for Product 1',
            price: 29.99,
            category: 'Category A'
        }
        const response = await request(app).put(`/api/products/${uuid.v4()}`).send(updatedProduct);
        expect(response.status).toBe(404);
    });

    it('returns 400 when productId is invalid', async () => {
        const updatedProduct = {
            name: 'Updated Product 1',
            description: 'Description for Product 1',
            price: 29.99,
            category: 'Category A'
        }
        const response = await request(app).put(`/api/products/invalid-productId`).send(updatedProduct);
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            "message": "\"productId\" must be a valid GUID"
        })
    });


    it('update existing Product', async () => {
        const product = await productRepository.createProduct(new Product('Product 1', 'Description for Product 1', 30, 'Category A'))
        const updatedProduct = {
            name: 'Updated Product 1',
            description: 'Description for Product 1',
            price: 29.99,
            category: 'Category A'
        }
        const response = await request(app).put(`/api/products/${product.getId()}`).send(updatedProduct);
        const { name, description, price, category } = response.body;
        const receivedProduct = { name, description, price, category }
        expect(response.status).toBe(200);
        expect(receivedProduct).toEqual(updatedProduct)
    });

    it('return 400 when name is missing in payload', async () => {
        const product = {
            description: 'Description for Product 1',
            price: 29.99,
            category: 'Category A'
        }
        const response = await request(app).put(`/api/products/${uuid.v4()}`).send(product);
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            "message": "\"name\" is required"
        })
    });

    it('return 400 when description is missing in payload', async () => {
        const product = {
            name: 'Product 1',
            price: 29.99,
            category: 'Category A'
        }
        const response = await request(app).put(`/api/products/${uuid.v4()}`).send(product);
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            "message": "\"description\" is required"
        })
    });

    it('return 400 when price is missing in payload', async () => {
        const product = {
            name: 'Product 1',
            description: 'Description for Product 1',
            category: 'Category A'
        }
        const response = await request(app).put(`/api/products/${uuid.v4()}`).send(product);
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            "message": "\"price\" is required"
        })
    });

    it('return 400 when category is missing in payload', async () => {
        const product = {
            name: 'Product 1',
            description: 'Description for Product 1',
            price: 29.99,
        }
        const response = await request(app).put(`/api/products/${uuid.v4()}`).send(product);
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            "message": "\"category\" is required"
        })
    });

    it('return 400 when price contains other datatypes other than number', async () => {
        const product = {
            name: 'Product 1',
            description: 'Description for Product 1',
            price: "29.99 eohf",
            category: 'Category A'
        }
        const response = await request(app).put(`/api/products/${uuid.v4()}`).send(product);
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            "message": "\"price\" must be a number"
        })
    });
})


describe('DELETE /api/prodcts/:productId', () => {
    it('delete a stored product', async () => {
        const product = await productRepository.createProduct(new Product('Product 1', 'Description for Product 1', 30, 'Category A'))
        const allProducts = await productRepository.findAllProducts();
        expect(allProducts.length).toEqual(1);
        const response = await request(app).delete(`/api/products/${product.getId()}`);
        expect(response.status).toBe(204);
        const allProductssAfterDeletion = await productRepository.findAllProducts();
        expect(allProductssAfterDeletion.length).toEqual(0);
    })
    it('returns 400 when productId is invalid', async () => {
        const response = await request(app).delete(`/api/products/invalid-productId`)
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            "message": "\"productId\" must be a valid GUID"
        })
    });
    it('returns 404 when product not found', async () => {
        const response = await request(app).get(`/api/products/${uuid.v4()}`)
        expect(response.status).toBe(404);
    });
})


describe('GET /strange-route', () => {
    it('return 404', async () => {
        const response = await request(app).get(`/api/strange-route`);
        expect(response.status).toBe(404);
    })
})

//user