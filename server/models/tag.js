const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tagSchema = new Schema({
    name: {
        type: String,
        default: ''
    }
});

exports = module.exports = mongoose.model('tag', tagSchema);