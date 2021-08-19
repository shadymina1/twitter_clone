const mongoose = require('mongoose');

const User = new mongoose.Schema({
    userName: {type : String ,unique: true , required: true},
    password: {type : String, required: true},
});

User.methods.toJSON = function() {
    const obj = this.toObject() ;
    delete obj.password;
    return obj;
}

module.exports = mongoose.model('User', User);

