const mongoose = require('mongoose');

// Property schema
const propertySchema = mongoose.Schema({
    name: String,
    imgSrc: String,
    textBrief: String,
});

const Property = module.exports = mongoose.model('Property', propertySchema);