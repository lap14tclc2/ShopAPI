const express = require('express');
const bodyParser = require('body-parser');
const { mongoose } = require('./db/mongoose');
const { Item } = require('./models/item');
const { Category } = require('./models/category');
const { Product } = require('./models/product');
const { Review } = require('./models/review');
const authenController = require('./controllers/authen/authenController');
const categoryController = require('./controllers/category/categoryController')
const productController = require('./controllers/product/productController');
const itemController = require('./controllers/item/itemController');
const reviewController = require('./controllers/review/reviewController');

const app = express();
app.use(bodyParser())
    .use('/api/auth', authenController)
    .use('/categories',categoryController)
    .use('/products', productController )
    .use('/items', itemController)
    .use('/reviews', reviewController )
    .listen(3000, () => {
        console.log('Server running at port 3000');
    });;

