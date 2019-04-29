const express = require('express');
const router = express.Router();
const User = require('../models/userProduit');


//create produit
router.post('/user/produit/:id', (req, res) => {
    User.findById({_id: req.params.id}).then((user) => {
        user.listeProduit.push({
            titre: req.body.titre,
            description: req.body.description,
            marque: req.body.marque,
            prix: req.body.prix,
            categorie: req.body.categorie,
            sexe: req.body.sexe,
        });
        user.save(() => {
            res.send(user)
        })
    });

});

//Get all the listeProduit from every users (+ their names)
router.get('/produit/', (req, res) => {
    User.find({}, 'listeProduit nom').then((produit) => res.send(produit))
    /**query.listeProduit.id({_id: req.params.id}).then((user) => {
        res.send(user)
    })**/
});

//get liste produit for each user with an id produit
router.get('/produit/:id', (req, res) => {
    User.find({'listeProduit._id': {_id: req.params.id}}).then((produit) => res.send(produit))
});


module.exports = router;
