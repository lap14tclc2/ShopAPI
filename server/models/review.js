const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    _id: Schema.Types.ObjectId,
    comment: String,
    rating: Number,
    item: {type: Schema.Types.ObjectId, ref: 'Item'},
    user: {type: Schema.Types.ObjectId, ref: 'User'}
});
const Review = mongoose.model('Review', ReviewSchema);
module.exports ={Review};