const mongoose = require('mongoose');
const random = require('mongoose-simple-random');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: {
        type: String,
        require: true
    },
    imageUrl : String,
    category: {type: Schema.Types.ObjectId, ref: 'Category'},
    items: [{type: Schema.Types.ObjectId, ref: 'Item'}]
});
ProductSchema.plugin(random);
const Product = mongoose.model('Product', ProductSchema);
module.exports = {Product}