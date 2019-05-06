const express = require('express');
const router = express.Router();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../models/user');
router.use(cors());

process.env.SECRET_KEY = 'secret';

//create a user
router.post('/register', (req, res, next) => {
    const userData = {
            lastName: req.body.lastName,
            firstName: req.body.firstName,
            email: req.body.email,
            password: req.body.password,
            createdDate: new Date(),
        }
    ;User.findOne({
        //check if user exist and crypt password
        email: req.body.email
    })
        .then(user => {
            if (!user) {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    userData.password = hash;
                    console.log('password:' + userData.password);
                    User.create(userData)
                        .then((user) => res.json(user));
                });
            } else {
                res.json({error: 'User already exists'})
            }
        })
        .catch((err) => next(err))
});

//log a user
router.post('/login', (req, res,next) => {
    User.findOne({
        email: req.body.email
    })
        .then(user => {
            if (user) {
                //compare password typed with password recorded in db
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    const payload = {
                        _id: user._id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email
                    };
                    //create token if password matches
                    let token = jwt.sign(payload, process.env.SECRET_KEY, {
                        expiresIn: 1440
                    });
                    console.log(token);
                    res.send(token)
                } else {
                    res.json({error: 'Password is not correct'})
                }
            } else {
                res.json({error: 'User does not exist'})
            }
        })
        .catch((err) => next(err))
});


//update a user's data
router.put('/user/:id', (req, res, next) => {
    // Find the user we want to update with his ID
    User.findById({_id: req.params.id}).then((user) => {
            user.lastName = req.body.lastName;
            user.firstName = req.body.firstName;
            //if password changed
            if (req.body.password) {
                user.password = bcrypt.hash(req.body.password, 10, (err, hash) => {
                    user.password = hash;
                    console.log('password:' + user.password);
                    user.save((user) => {
                        res.json(user)
                    })
                })
            } else {
                user.save((user) => {
                    res.json(user)
                })
            }
        }
    )
        .catch((err) => next(err))
});


//get all users
router.get('/user', (req, res, next) => {
    User.find()
        .then((user) => {
            res.json(user)
        }).catch(err =>
        next(err))
});

//get user by id
router.get('/user/:id', (req, res,next) => {
    // use our user model to find the user we want
    User.findById({_id: req.params.id})
        .then((user) => {
            res.json(user);
        }).catch(err => {
        next(err)
    });
});

// delete a user with his id
router.delete('/user/:id', (req, res, next) => {
    User.findByIdAndDelete({_id: req.params.id})
        .then((user) => {
            res.send(user);
        }).catch(err => {
        next(err)
    });
});


module.exports = router;
