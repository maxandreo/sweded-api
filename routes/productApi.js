const express = require('express');
const router = express.Router();
const Product = require('../models/product');


//create a product
router.post('/product', (req, res, next) => {
    Product.create({
            seller: req.body.seller,
            title: req.body.title,
            description: req.body.description,
            brand: req.body.brand,
            price: req.body.price,
            category: req.body.category,
            sex: req.body.sex,
            createdDate: new Date()
        }
    )
        .then(produit => res.json(produit))
        .catch((err) => next(err))

})
;

//Update a product
router.put('/product/:id', (req, res, next) => {
    //find the product you want to update
    Product.findById({_id: req.params.id})
        .then(product => {
            product.title = req.body.title,
                product.description = req.body.description,
                product.brand = req.body.brand,
                product.price = req.body.price,
                product.category = req.body.category,
                product.sex = req.body.sex,
                product.save((product) => {
                    res.json(product)
                })
        }).catch((err) => next(err))
});
module.exports = router;

//Get all the products
router.get('/product', (req, res, next) => {
    Product.find()
        .then((product) => {
            res.json(product)
        }).catch((err) => next(err))


});

//get product by id
router.get('/product/:id', (req, res, next) => {
    Product.findById({_id: req.params.id})
        .then((product) => {
            res.json(product)
        }).catch((err) => next(err))
});

//delete a product
router.get('/product', (req, res, next) => {
    Product.findByIdAndDelete({_id: req.params.id})
        .then((product) => {
            res.json(product)
        }).catch((err) => next(err))
});
/**
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
});

 //get liste produit for each user with an id produit
 router.get('/produit/:id', (req, res) => {
    User.find({'listeProduit._id': {_id: req.params.id}}).then((produit) => res.send(produit))
});

 **/


