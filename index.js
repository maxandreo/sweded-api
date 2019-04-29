const express = require('express');
const mongoose = require('mongoose');
const userApi = require('./routes/userApi');
const produitApi = require('./routes/produitApi');

//set up express app(an instance of Express)
const app =express();

//connect to MongoDB
mongoose.connect('mongodb://localhost/sweded', {useNewUrlParser: true});
//cause mongoose promises are deprecated
mongoose.Promise = global.Promise;

//replace body-parsing
app.use(express.json());

//initialize routes
app.use('/api',userApi,produitApi);

//listen for requests
app.listen(process.env.port||4000,function(){
    console.log('now listening for requests');
});
