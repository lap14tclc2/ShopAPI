const express = require('express');
const mongoose = require('../../db/mongoose');
const { Product } = require('../../models/product');
const { ObjectId } = require('mongodb');
const { Item } = require('../../models/item');
const router = express.Router();

// return 4 record random in table

router.get('/random', (req, res, next) => {
    Product.findRandom({}, {}, { limit: 5 }, (err, products) => {
        if (err) {
            return res.status(500).json({ message: 'Error when fetch categories' });
        }
        res.json(products);
    })
});

router.get('/', (req, res, next) => {
    Product.find({}, (err, products) => {
        if (err) {
            return res.status(500).json({ message: 'Error when fetch products' });
        }
        res.json(products);
    })
});

router.get('/:categoryId', (req,res) => {
    const categoryId = new ObjectId(req.params.categoryId);
    Product.find({category: categoryId}, (err,products) => {
        if (err) {
            return res.status(500).json({ message: 'Error when fetch products' });
        }
        res.json(products);
    })
})

router.post('/', (req, res, next) => {
    const { name, imageUrl, category, items } = req.body;
    Product.create({
        _id: new ObjectId(),
        name: name,
        imageUrl: imageUrl,
        category: category,
        items: items
    }, (err, product) => {
        if (err) {
            return res.status(400).json({
                message: err.message
            });
        }
        res.json(product);
    });
})

router.put('/product/:id', async (req, res) => {
    const productId = new ObjectId(req.params.id);
    const itemIds = [];
    try {
        itemIds = await Item.find({ product: productId });
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
    Product.findOneAndUpdate({ _id: productId }, { $set: { items: itemIds } },
        { returnOriginal: false }, (err, product) => {
            if (err) {
                res.status(500).json({ message: 'Error when update product!' });
            }
            res.json(product);
        })
})
module.exports = router;