const mongoose = require('mongoose');

const Message = new mongoose.Schema({
    sender_id: {type : String ,unique: true , required: true},
    receiver_id: {type : String ,unique: true , required: true},
    text: {type : String, required: true},
});

module.exports = mongoose.model('Message', Message);

