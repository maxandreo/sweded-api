const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    seller:{
        type: String

    },
    title: {
        type: String
        //required: [true, 'Nom est requis']
    },
    description: {
        type: String
        //required: [true, 'Description est requise']
    },
    brand: {
        type: String
    },
    price: {
        type: String
    },
    category: {
        type: String
        //required: [true, 'categorie est requise']
    },
    sex: {
        type: String
    },
    createdDate: {
        type: Date,
        //required: [true, 'date est requise']

    }

});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;