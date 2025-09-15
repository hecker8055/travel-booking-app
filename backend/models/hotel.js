const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
    name: {
        en: String,
        ar: String
    },
    address: String,
    stars: Number,
    rating: Number,
    priceFrom: Number,
    destination: { type: mongoose.Schema.Types.ObjectId, ref: 'Destination' },
    roomTypes: [
        {
            name: String,
            price: Number,
            facilities: [String]
        }
    ],
    nearbyAttractions: [
        {
            name: String,
            distance: String
        }
    ],
    photos: [
        {
            url: String
        }
    ]
}, { strict: false });  

module.exports = mongoose.model('Hotel', hotelSchema);
