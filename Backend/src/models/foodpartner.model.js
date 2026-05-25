const mongoose = require('mongoose');

const foodPartnerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    // GeoJSON location for geospatial queries (longitude, latitude)
    location: {
        type: {
            type: String,
            enum: ['Point']
        },
        coordinates: {
            type: [Number]  // [longitude, latitude]
        }
    }
});

// Create 2dsphere index for geospatial queries
foodPartnerSchema.index({ location: '2dsphere' });

const FoodPartner = mongoose.model('Foodpartner', foodPartnerSchema);

module.exports = FoodPartner;