const express = require('express');
const mongoose = require('../../db/mongoose');
const { Item } = require('../../models/item');
const { ObjectId } = require('mongodb');
const {Review} = require('../../models/review')
const router = express.Router();

// return 4 record random in table

router.get('/', (req, res, next) => {
    Item.find({},(err, items) => {
        if (err) {
            return res.status(500).json({message: 'Error when fetch items'});
        }
        res.json(items);
    })
});

router.get('/:productId', (req, res) => {
    const productId = ObjectId(req.params.productId);
    Item.find({product: productId},(err, items) => {
        if (err) {
            return res.status(500).json({message: 'Error when fetch items'});
        }
        res.json(items);
    })
})

router.get('/random', (req, res) => {
    Item.findRandom({}, {}, { limit: 5 }, (err, items) => {
        if (err) {
            return res.status(500).json({ message: 'Error when fetch items' });
        }
        res.json(items);
    })
})

router.post('/', (req,res, next) => {
    const {name, title,description,price,imageUrl,product,reviews} = req.body;
    Item.create({
        _id: new ObjectId(),
        name: name,
        title: title,
        description: description,
        price:price,
        imageUrl: imageUrl,
        product: product,
        reviews: reviews
    },(err, item) => {
        if(err){
            return res.status(400).json({
                message: err.message
            });
        }
        res.json(item);
    });
})

router.put('/item/:itemId', async (req, res) => {
    const itemId = new ObjectId(req.params.itemId);
    await Review.find({ item: itemId }, async (err, reviews) => {
        if (err) {
            res.status(401).json({ message: 'No product found!' });
        }
        await Item.findOneAndUpdate({ _id: itemId }, { $set: { reviews: reviews } },
            { returnOriginal: false }, (err, item) => {
                if (err) {
                    res.status(500).json({ message: 'Error when update item!' });
                }
            })
    });
  
})
module.exports = router;