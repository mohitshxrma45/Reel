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
    foodCost: {
        type: Number,
        required: true
    },
    views: {
        type: Number,
        default: 0
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
    },
}, { timestamps: true });

const foodModel = mongoose.model('Food', foodSchema);

module.exports = foodModel;