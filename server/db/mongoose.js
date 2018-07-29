const mongoose = require('mongoose');


const connectUrl = "mongodb://127.0.0.1:27017/Shop";
// connect to db

mongoose.connect(connectUrl);
mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on('error', function callback(err){
    console.log(err)
})
module.exports = {mongoose};