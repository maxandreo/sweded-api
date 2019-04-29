const express = require('express');
const router = express.Router();
const User = require('../models/userProduit');

//create a user
router.post('/user', (req, res) => {
    User.create({
        nom: req.body.nom,
        prenom: req.body.prenom,
        telephone: req.body.telephone,
        email: req.body.email,
        adresse: req.body.adresse,
        password: req.body.password,
        dateAjout: new Date(),

        //listeProduit:req.body.listeProduit,
    }).then((user) => res.send(user))
});

//get all users
router.get('/user', (req, res) => {
    User.find()
        .then((user) => {
        res.send(user)
    })
});



//update a user's data
router.put('/user/:id', (req, res, next) => {
    // Find the user we want to update with his ID
    User.findById({_id: req.params.id}).then((user) => {

        user.nom = req.body.nom
        user.prenom = req.body.prenom
        user.telephone = req.body.telephone
        user.email = req.body.email
        user.adresse = req.body.adresse
        user.password = req.body.password

        // save the changes made
        user.save((user) => {
            res.send(user)
        })
    })
        .catch(next);
});

//get user by id
router.get('/user/:id', (req, res, next) => {
    // use our user model to find the user we want
    User.findById({_id: req.params.id})
        .then((user) => {
        res.send(user);
    }).catch(next);
});

// delete a user with his id
router.delete('/user/:id', (req, res, next) => {
    User.findByIdAndDelete({_id: req.params.id})
        .then((user) => {
        res.send(user);
    }).catch(next);
});






module.exports = router;
