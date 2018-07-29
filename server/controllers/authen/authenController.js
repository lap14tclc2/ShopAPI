const express = require('express');
const bodyParser = require('body-parser');
const { mongoose } = require('../../db/mongoose');
const { ObjectId } = require('mongodb');
const { User } = require('../../models/user');
const { get, verify } = require('../../helpers/authen');
const bcrypt = require('bcrypt');
const router = express.Router();

router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    //ecnrypt password before save in db
    await User.create({
        _id: new ObjectId(),
        username: username,
        password: bcrypt.hashSync(password, 10)
    }, (err, user) => {
        if (err) {
            return res.status(400).json({
                message: 'There has a problem registering user: ' + err.message
            });
        }
        res.json({ authen: true });
    });
});

//get user id based on the token got back from register endpoint
router.get('/me', (req, res) => {
    const token = req.headers['x-access-token'];
    if (!token) {
        return res.status(401).json({ authen: false, message: 'No token found!' });
    }
    // decode the token
    const decoded = verify(token);
    if (!decoded) {
        return res.status(500).json({ authen: false, message: 'Failed to authenticate token!' });
    }
    //return information of user without password and reviews
    User.findById(decoded, { password: 0, reviews: 0, _id:0,items:0 }, (err, user) => {
        if (err) {
            return res.send(500).json({
                message: 'There was a problem finding user: ' + err.message
            });
        }
        if (!user) {
            return res.send(404).json({
                message: 'User cannot found!'
            })
        }
        res.status(200).json(user);
    })
});

router.get('/user/:id',(req,res) => {
    const id = new ObjectId(req.params.id);
    User.findById({_id:id},{password: 0, reviews: 0, _id:0,items:0},(err,user)=>{
        if (err) {
            return res.send(500).json({
                message: 'There was a problem finding user: ' + err.message
            });
        }
        if (!user) {
            return res.send(404).json({
                message: 'User cannot found!'
            })
        }
        const time = id.getTimestamp();
        res.status(200).json({user, time});
    })
})

router.post('/login', async (req, res, next) => {
    const { username, password } = req.body;
    await User.findOne({ username: username }, (err, user) => {
        if (err) {
            return res.status(500).json({
                authen: false, token: null, message: 'Error on the server: ' + err.message
            });
        }
        if (!user) {
            return res.status(404).json({
                authen: false, token: null,message: 'User cannot found!'
            });
        }

        const isValidPassword = bcrypt.compareSync(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ authen: false, token: null, message: 'Password incorrect!' });
        }
        // if password true then create a token and send to user
        const token = get(user._id);
        res.status(200).json({ authen: true, token: token });
    })
})

module.exports = router;
