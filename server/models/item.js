const mongoose = require('mongoose');
const random = require('mongoose-simple-random');

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: {
        type: String,
        require: true
    },
    title: String,
    description: String,
    price: Number,
    imageUrl : String,
    product: {type: Schema.Types.ObjectId, ref: 'Product'},
    reviews: [{type: Schema.Types.ObjectId, ref: 'Review'}]
});
ItemSchema.plugin(random);
const Item = mongoose.model('Item', ItemSchema);
module.exports = {Item};