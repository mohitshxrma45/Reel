const mongoose = require('mongoose');
const FoodPartner = require('./foodpartner.model');
const { likeFood } = require('../controllers/food.controller');
const likeModel = require('./likes.model');
const saveModel = require('./save.model');


const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    video: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    FoodPartner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Foodpartner",

    },
    likeCount: {
        type: Number,
        default: 0
    },
    savesCount:{
        type: Number,
        default: 0
    }
    
})

const foodModel = mongoose.model('Food', foodSchema);

module.exports = foodModel;