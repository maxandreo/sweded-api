const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    firstName:
        {
            type: String,
            required: [true, 'Nom est requis']
        },
    lastName:
        {
            type: String,
            required: [true, 'Prenom est requis']
        },
    email:
        {
            type: String,
            //required: [true, 'email est requis']
        },
    password:
        {
            type: String,
            //required: [true, 'password est requis']
        },
    createdDate:
        {
            type: Date,
        },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
