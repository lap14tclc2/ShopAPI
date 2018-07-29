const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    _id: Schema.Types.ObjectId,
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    reviews: [{type: Schema.Types.ObjectId, ref: 'Review'}],
    items: [{type: Schema.Types.ObjectId, ref: 'Item'}]
});
UserSchema.methods.comparePassWord = (password) =>{
    return bcrypt.compareSync(password,this.password);
}
const User = mongoose.model('User', UserSchema);
module.exports = {User};