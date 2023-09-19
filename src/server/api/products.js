const express = require('express')
const productsRouter = express.Router()

const jwt = require('jsonwebtoken');
const { getAllProducts } = require('../db/products');

productsRouter.get('/', async( req, res, next) => {
    try {
        const users = await getAllProducts();

        res.send({
            users
        });
    } catch ({name, message}) {
        next({name, message})
    }
});