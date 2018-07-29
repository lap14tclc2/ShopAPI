const express = require('express');
const mongoose = require('../../db/mongoose');
const { Item } = require('../../models/item');
const { User } = require('../../models/user');
const { Review } = require('../../models/review')
const { ObjectId } = require('mongodb')
const { verify } = require('../../helpers/authen');
const router = express.Router();

// return 4 record random in table

router.get('/review/:itemId', (req, res, next) => {
    const itemId = new ObjectId(req.params.itemId);
    Review.find({ item: itemId }, (err, reviews) => {
        if (err) {
            return res.status(500).json({ message: 'Error when fetch reviews' });
        }
        res.json(reviews);
    })
});


router.post('/', async (req, res) => {
    const token = req.headers['x-access-token'];
    const { comment, rating, itemId } = req.body;
    if (!token) {
        return res.status(401).json({ message: 'No token found!' });
    }
    const userId = verify(token);
    Review.create({
        _id: new ObjectId(),
        comment: comment,
        rating: rating,
        item: new ObjectId(itemId),
        user: userId
    }, (err, review) => {
        if (err) {
            return res.status(400).json({
                message: err.message
            });
        }
        res.json(review);
    })
    
});

module.exports = router;