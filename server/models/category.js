const mongoose = require('mongoose');
const random = require('mongoose-simple-random');

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: {
        type: String,
        require: true
    },
    imageUrl : String,
    products: [{type: Schema.Types.ObjectId, ref: 'Product'}]
});

CategorySchema.plugin(random);
const Category = mongoose.model('Category', CategorySchema);
module.exports ={Category};