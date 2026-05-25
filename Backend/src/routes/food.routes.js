const express = require('express');
const foodController = require('../controllers/food.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const router = express.Router();


//for file upload--videos/images
const multer = require('multer');

//storage ke liye memory storage use kar rahe hai
const upload = multer({
    storage: multer.memoryStorage(),
})



// POST /api/food/ [protected]------>
router.post('/',
    authMiddleware.authFoodPartnerMiddleware,
    upload.single('video'),
    foodController.createFood);



//GET /api/food/ [protected]------>food items ki video user tak taaki vo scrool like kar sake

router.get('/',
    authMiddleware.authUserMiddleware,
    foodController.getfoodItems);



router.post('/like',
    authMiddleware.authUserMiddleware,
    foodController.likeFood);



router.post('/save',
    authMiddleware.authUserMiddleware,
    foodController.saveFood);



router.get('/saved',
    authMiddleware.authUserMiddleware,
    foodController.getSavedFood);



// PUT /api/food/:id/view - Increment views
router.put('/:id/view',
    foodController.incrementViews);

// GET /api/food/with-partners - Get all food with partner location
router.get('/with-partners',
    authMiddleware.authUserMiddleware,
    foodController.getFoodWithPartners);

module.exports = router;