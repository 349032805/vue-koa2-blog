const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const meSchema = new Schema({
    content: {
        type: String,
        default: ''
    }
});

exports = module.exports = mongoose.model('me', meSchema);