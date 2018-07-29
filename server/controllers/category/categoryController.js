const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('../../db/mongoose');
const { Category } = require('../../models/category');
const { Product } = require('../../models/product');
const { ObjectId } = require('mongodb')
const router = express.Router();

// return 4 record random in table

router.get('/random', (req, res, next) => {
    Category.findRandom({}, {}, { limit: 3 }, (err, categories) => {
        if (err) {
            return res.status(500).json({ message: 'Error when fetch categories' });
        }
        res.json(categories);
    })
});


router.get('/', (req, res) => {
    Category.find({}, (err, categories) => {
        if (err) {
            return res.status(500).json({ message: 'Error when fetch categories' });
        }
        res.json(categories);
    })
});

router.put('/category/:id', async (req, res) => {
    const categoryId = new ObjectId(req.params.id);
    const productIds = [];
    await Product.find({ category: categoryId }, async (err, products) => {
        if (err) {
            res.status(401).json({ message: 'No product found!' });
        }
         products.map(product => {
            productIds.push(product._id);
        })
    });
    console.log(productIds);
    //update category
    await Category.findOneAndUpdate({ _id: categoryId }, { $set: { products: productIds } },
        { returnOriginal: false },  (err, category) => {
            if (err) {
                res.status(500).json({ message: 'Erro when update category!' });
            }
             res.json(category);
        })

});


module.exports = router;