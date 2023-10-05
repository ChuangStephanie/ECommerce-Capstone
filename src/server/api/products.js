const express = require('express')
const productsRouter = express.Router()

const jwt = require('jsonwebtoken');
const { getAllProducts, createProduct, updateProduct, deleteProduct, getSingleProduct } = require('../db/products');
const { requireAdmin } = require('../api/utils')

productsRouter.get('/', async( req, res, next) => {
    try {
        const products = await getAllProducts();

        res.send({
            products
        });
    } catch ({name, message}) {
        next({name, message})
    }
});

productsRouter.get('/:id', async(req,res,next)=>{
    const productId = req.params.id
    try {
        const product = await getSingleProduct(productId);

        res.send(
            {
                product
            }
        )
    } catch ({name, message}) {
        next({name, message})
    }
})

productsRouter.post('/', requireAdmin, async(req,res,next)=>{
    const { name, price, description, category, onSale, image } = req.body
    try {
        const product = await createProduct({
            name,
            price,
            description,
            category,
            onSale,
            image
        });

        res.send(
            {
                product
            }
        )
    } catch ({name, message}) {
        next({name, message})
    }
})

productsRouter.patch('/:id', requireAdmin, async(req,res,next)=>{
    const productId = req.params.id
    const { name, price, description, category, onSale, image } = req.body
    try {
        const product = await updateProduct(productId, {
            name,
            price,
            description,
            category,
            onSale,
            image
        });

        res.send(
            {
                product
            }
        )
    } catch ({name, message}) {
        next({name, message})
    }
})

productsRouter.delete('/:id', requireAdmin, async(req,res,next)=>{
    const productId = req.params.id
    try {
        const product = await deleteProduct(productId);

        res.send(
            {
                product
            }
        )
    } catch ({name, message}) {
        next({name, message})
    }
})


module.exports = productsRouter