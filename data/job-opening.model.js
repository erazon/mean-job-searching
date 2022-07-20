const mongoose = require('mongoose');
const locationSchema = require('./location.model');

const jobOpeningSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    location: locationSchema,
    description: String,
    experience: String,
    skills: [String],
    postDate: String
});

mongoose.model('JobOpening', jobOpeningSchema, 'jobOpenings');