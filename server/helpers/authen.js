const jwt = require('jsonwebtoken')
const PRIVATE_KEY = 'shopee-pee-pee'


function getToken(_id){
    const token = jwt.sign({id: _id}, PRIVATE_KEY);
    return token;
}

function verifyToken(token){
    const decode = jwt.verify(token, PRIVATE_KEY);
    return decode.id;
}

module.exports = {
    get: getToken,
    verify: verifyToken
};