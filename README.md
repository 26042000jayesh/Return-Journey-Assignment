# Return-Journey-Assignment

# Task - Array Manipulation

Function getUniqueElements uses an object mp to efficiently keep track of unique elements encountered in the input array. It iterates through the input array, checks if the element is present in the mp. If not, it adds the element to both the mp and the resultArray, ensuring only unique elements are included in the resultArray. Time complexity O(N).

# Task - Object Operations

The function mergeObjects that combines properties from two objects. It merges functions and non-function properties. If both objects have functions with the same key, it renames one function to avoid overwriting, ensuring all properties are included in the resulting merged object.

# Task - Logical Operations

The function findCommonElements uses an object mp to efficiently track elements from the first array. It iterates through the second array, checking for elements present in the mp, storing common elements in the result array. This optimizes the process to find common elements between two arrays. Time complexity O(N).

# RESTful API development

Implemented RESTful API's using Node.js and JavaScript (Had a discussion with Alok for using JavaScript instead of Typescript)

## Table of Contents

- [Overview](#overview)
- [Endpoints](#endpoints)
- [Schema](#schema)
- [Setup](#setup)
- [Running the Application](#running-the-application)
- [Testing](#testing)
- [Environment Variables](#environment-variables)
- [Development and Production Modes](#development-and-production-modes)
- [Contributing](#contributing)
- [License](#license)

## Overview

Designed Endpoints for products.

## Endpoints

### GET api/products

- Description: Endpoint to get all products.
- Method: `GET`
- Response:
  - Status Code: `200 OK`
  - Body: All product records.

### GET api/products/{productId}

- Description: Endpoint to get a specific product by ID.
- Method: `GET`
- Parameters:
  - `{productId}`: Unique ID of the product.
- Responses:
  - Status Code: `200 OK`
    - Body: Record with matching ID.
  - Status Code: `400 Bad Request`
    - Body: If `productId` is invalid.
  - Status Code: `404 Not Found`
    - Body: If record with ID doesn't exist.

### POST api/products

- Description: Endpoint to create a new product.
- Method: `POST`
- Request Body:
  - `name`: string (required)
  - `price`: number (required)
  - `category`: string (required)
  - `description`: string (required)
- Responses:
  - Status Code: `201 Created`
    - Body: Newly created product record.
  - Status Code: `400 Bad Request`
    - Body: If request body does not contain required fields.

### PUT api/products/{productId}

- Description: Endpoint to update an existing product.
- Method: `PUT`
- Parameters:
  - `{productId}`: Unique ID of the product to be updated.
- Request Body:
  - Same fields as POST api/products.
- Responses:
  - Status Code: `200 OK`
    - Body: Updated product record.
  - Status Code: `400 Bad Request`
    - Body: If `productId` is invalid or request body is invalid.
  - Status Code: `404 Not Found`
    - Body: If record with ID doesn't exist.

### DELETE api/products/{productId}

- Description: Endpoint to delete an existing product.
- Method: `DELETE`
- Parameters:
  - `{productId}`: Unique ID of the product to be deleted.
- Responses:
  - Status Code: `204 No Content`
    - Body: If the record is found and deleted.
  - Status Code: `400 Bad Request`
    - Body: If `productId` is invalid.
  - Status Code: `404 Not Found`
    - Body: If record with ID doesn't exist.


## Schema

Describe the schema used for products.

Example:

- id: string (UUID)
- name: string (required)
- price: number (required)
- category: string (required)
- description: string (required)

## Setup

**Installation**

   After cloning the repository, navigate to the project directory and run:

   ```bash
   npm install


## Running the Application

To run the application in production mode, execute:

```bash
   npm run start:prod


To run the application in production mode, execute:

```bash
   npm run start:dev

## Testing

To execute tests using jest, run:

```bash
   npm run test


## Environment Variables

APP_PORT: The application port is set to 4000 by default. You can change this port by modifying the APP_PORT environment variable.

