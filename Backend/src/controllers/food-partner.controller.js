const foodPartnerModel =require('../models/foodpartner.model');
const foodModel = require('../models/food.model');



async function getFoodPartnerbyId(req,res){

    const foodPartnerId= req.params.id;




const foodItemsByFoodPartner=await foodModel.find({FoodPartner:foodPartnerId});
    const foodPartner = await foodPartnerModel.findById(foodPartnerId);


    if(!foodPartner){
        return  res.status(404).json({message:"Food Partner not found"});
    }

    res.status(200).json({
        message:"Food Partner fetched successfully",
        foodPartner:{
            ...foodPartner.toObject(),
            foodItems:foodItemsByFoodPartner
        }
    });
}

module.exports={
    getFoodPartnerbyId
}