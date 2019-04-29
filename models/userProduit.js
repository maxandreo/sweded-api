const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProduitSchema = new Schema({
    titre: {
        type: String
        //required: [true, 'Nom est requis']
    },
    description: {
        type: String
        //required: [true, 'Description est requise']
    },
    marque: {
        type: String
    },
    prix: {
        type: String
    },
    categorie: {
        type: String
        //required: [true, 'categorie est requise']
    },
    sexe: {
        type: String
    },
    dateAjout: {
        type: Date,
        default: Date.now
        //required: [true, 'date est requise']

    }

});

const UserSchema = new Schema({
    nom:
        {
            type: String,
            required: [true, 'Nom est requis']
        },
    prenom:
        {
            type: String,
            required: [true, 'Prenom est requis']
        },
    telephone:
        {
            type: String,
            //required: [true, 'telephone est requis']
        },
    email:
        {
            type: String,
            //required: [true, 'email est requis']
        },
    adresse:
        {
            type: String,
            //required: [true, 'adresse est requis']
        },
    password:
        {
            type: String,
            //required: [true, 'password est requis']
        },
    dateAjout:
        {
            type: Date,
        },
    listeProduit: [ProduitSchema]
});

const UserProduit = mongoose.model('UserProduit', UserSchema);

module.exports = UserProduit;
