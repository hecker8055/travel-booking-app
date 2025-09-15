const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema({
    name: String,
    country: String,
    description: String,
    coordinates: {
        lat: Number,
        lon: Number
    }
}, { strict: false });  

module.exports = mongoose.model('Destination', destinationSchema);
