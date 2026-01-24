const foodModel = require('../models/food.model');
const storageService = require('../services/storage.service');
const { v4: uuid } = require("uuid")
const likeModel = require('../models/likes.model');
const saveModel = require('../models/save.model')


//controller to create food item
async function createFood(req, res) {

    const fileUploadResult = await storageService.uploadFile(req.file.buffer, uuid());


    const foodItem = await foodModel.create({
        name: req.body.name,
        description: req.body.description,
        video: fileUploadResult.url,
        FoodPartner: req.foodPartner._id
    })

    res.status(201).json({
        message: "Food created successfully",
        food: foodItem
    })

}

//controller to get food items
async function getfoodItems(req, res) {
    const foodItems = await foodModel.find({});
    res.status(200).json({
        message: "Food items fetched successfully",
        foodItems
    });
}

//controller to like a food item
async function likeFood(req, res) {
    try {
        const { foodId } = req.body;
        const user = req.user;

        if (!foodId) {
            return res.status(400).json({ error: "foodId missing" });
        }

        // Find food
        const food = await foodModel.findById(foodId);
        if (!food) {
            return res.status(404).json({ error: "Food not found" });
        }

        // Check if already liked
        const isAlreadyLiked = await likeModel.findOne({
            user: user._id,
            food: foodId
        });

        // If already liked → UNLIKE
        if (isAlreadyLiked) {
            await likeModel.deleteOne({ _id: isAlreadyLiked._id });

            food.likeCount = Math.max(0, food.likeCount - 1);
            await food.save();

            return res.status(200).json({
                like: false,
                likeCount: food.likeCount
            });
        }

        // Else → LIKE
        await likeModel.create({
            user: user._id,
            food: foodId
        });

        food.likeCount += 1;
        await food.save();

        return res.status(201).json({
            like: true,
            likeCount: food.likeCount
        });

    } catch (err) {
        console.error("Like Food Error:", err);
        return res.status(500).json({ error: "Server error" });
    }
}


//controller to save a food item
async function saveFood(req, res) {
    try {
        const { foodId } = req.body;
        const user = req.user;

        if (!foodId) {
            return res.status(400).json({ error: "foodId missing" });
        }
        // Find food
        const food = await foodModel.findById(foodId);
        if (!food) {
            return res.status(404).json({ error: "Food not found" });
        }

        // Check if already saved
        const isAlreadySaved = await saveModel.findOne({
            user: user._id,
            food: foodId
        });

        // If already saved → UNSAVE
        if (isAlreadySaved) {
            await saveModel.deleteOne({ _id: isAlreadySaved._id });

            food.savesCount = Math.max(0, food.savesCount - 1);
            await food.save();

            return res.status(200).json({
                save: false,
                savesCount: food.savesCount
            });
        }

        // Else → SAVE
        await saveModel.create({
            user: user._id,
            food: foodId
        });

        food.savesCount += 1;
        await food.save();

        return res.status(201).json({
            save: true,
            savesCount: food.savesCount
        });

    } catch (err) {
        console.error("Save Food Error:", err);
        return res.status(500).json({ error: "Server error" });
    }
}

//controller to get saved food items for a user
async function getSavedFood(req, res) {
    const user = req.user;

    const savedFoods = await saveModel.find({ user: user._id }).populate('food');

    if (!savedFoods || savedFoods.length === 0) {
        return res.status(200).json({
            message: "No saved food items found",

        });
    }
    res.status(200).json({
        message: "Saved food items fetched successfully",
        savedFoods
    });

}



module.exports = {
    createFood,
    getfoodItems,
    likeFood,
    saveFood,
    getSavedFood
}