const mongoose = require('mongoose');

// schema
const schema = mongoose.Schema({
    name:{
        type: String
    },
    mobile:{
        type: String
    },
    email:{
        type: String
    }
});

const model = mongoose.model('items', schema);
module.exports = model;