const express = require('express');
const cors = require("cors");
const mongoose = require('mongoose');
const userApi = require('./routes/userApi');
const productApi = require('./routes/productApi');

//set up express app(an instance of Express)
const app =express();

//connect to MongoDB
mongoose.connect('mongodb://localhost/sweded', {useNewUrlParser: true})
    .then(()=>console.log("MongoDB connected"))
    .catch(err=>console.log(err));

//cause mongoose promises are deprecated
mongoose.Promise = global.Promise;

//replace body-parsing
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//Allows commucation with front-end
app.use(cors());

//initialize routes
app.use('/api',userApi,productApi);

//listen for requests
app.listen(process.env.port||4000,function(){
    console.log('now listening for requests');
});
