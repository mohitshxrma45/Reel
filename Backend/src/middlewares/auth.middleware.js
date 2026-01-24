const foodPartnerModel = require('../models/foodpartner.model');
const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');



//middleware ko authenticate karne ke liye
async function authFoodPartnerMiddleware(req, res, next) {

    //get token from cookies
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            message: "Please login first "
        });
    }



    //verify token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const foodPartner = await foodPartnerModel.findById(decoded.id);
        req.foodPartner = foodPartner;
        next();


    } catch (err) {
        return res.status(401).json({
            message: "Invalid Token"
        });

    }
}


async function authUserMiddleware(req, res, next) {
    //get token from cookies
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "Please login first "
        });
    }

    //verify token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.id);
        req.user = user;
        next();


    } catch (err) {
        return res.status(401).json({
            message: "Invalid Token"
        });
    }
}


module.exports = {
    authFoodPartnerMiddleware,
    authUserMiddleware

}

