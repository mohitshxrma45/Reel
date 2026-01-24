const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const FoodPartnerModel = require('../models/foodpartner.model');



//user ko register karne ke liye function
async function registerUser(req, res) {
    const { name, email, password, phone, address } = req.body;



    //check if user already exists
    const isUserAlreadyyExist = await userModel.findOne({ email })

    if (isUserAlreadyyExist) {
        return res.status(400).json({ message: 'User already exists' });
    }


    const hashedPassword = await bcrypt.hash(password, 10);

    //create user
    const user = await userModel.create({
        name,
        email,
        password: hashedPassword,
        phone,
        address
    })


    //create token
    const token = jwt.sign({
        id: user._id,

    }, process.env.JWT_SECRET);


    //cookie set karna
    res.cookie("token", token);

    res.status(201).json({
        message: 'User registered successfully',
        user: {
            _id: user._id,
            email: user.email,
            name: user.name,
            phone: user.phone,
            address: user.address
        }
    });



}


//user ko login karne ke liye function
async function loginUser(req, res) {


    const { email, password } = req.body;


    //find user by email
    const user = await userModel.findOne({ email });

    if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }


    //compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }




    const token = jwt.sign({
        id: user._id,

    }, process.env.JWT_SECRET);


    res.cookie("token", token);
    res.status(200).json({
        message: 'User logged in successfully',
        user: {
            email: user.email,
            fullName: user.fullName
        }
    });
}



//user ko logout karne ke liye function
function logoutUser(req, res) {
    res.clearCookie("token");
    res.status(200).json({ message: "User logged out successfully" });
}






//food partner register karne ke liye function
async function registerFoodPartner(req, res) {

    const { name, email, password, phone, address } = req.body;

    const isAccountAlreadyExist = await FoodPartnerModel.findOne({ email });

    if (isAccountAlreadyExist) {
        return res.status(400).json({ message: 'Account already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const foodPartner = await FoodPartnerModel.create({
        name,
        email,
        password: hashedPassword,
        phone,
        address
    });


    const token = jwt.sign({
        id: foodPartner._id,
    }, process.env.JWT_SECRET);

    res.cookie("token", token);
    res.status(201).json({
        message: 'Food Partner registered successfully',
        foodPartner: {
            _id: foodPartner._id,
            email: foodPartner.email,
            name: foodPartner.name,
            phone: foodPartner.phone,
            address: foodPartner.address
        }
    });
}

//food partner login karne ke liye function
async function loginFoodPartner(req, res) {

    const { email, password } = req.body;

    const foodPartner = await FoodPartnerModel.findOne({ email });

    if (!foodPartner) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }
    const isPasswordValid = await bcrypt.compare(password, foodPartner.password);

    if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }
    const token = jwt.sign({
        id: foodPartner._id,
    }, process.env.JWT_SECRET);

    res.cookie("token", token);

    res.status(200).json({
        message: 'Food Partner logged in successfully',
        foodPartner: {
            id: foodPartner._id,
            email: foodPartner.email,
            name: foodPartner.name
        }
    });
}

//food partner logout karne ke liye function
function logoutFoodPartner(req, res) {
    res.clearCookie("token");
    res.status(200).json({ message: "Food Partner logged out successfully" });
}


module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    registerFoodPartner,
    loginFoodPartner,
    logoutFoodPartner

};