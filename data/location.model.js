const mongoose = require('mongoose');

const locationSchema = mongoose.Schema({
    address: String,
    coordinates: {
        type: [Number],
        index: '2dsphere'
    }
});

module.exports = locationSchema;