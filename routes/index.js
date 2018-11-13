const express = require('express');
const router = express.Router();

const AuthController = require('./../controllers/AuthController');
const PhoneController = require('./../controllers/PhoneController');
const AdminController = require('./../controllers/AdminController');
const LocationController = require('./../controllers/LocationController');
const UserController = require('./../controllers/UserController');
const ProductController = require('../controllers/ProductController');
const UploadController = require('./../controllers/UploadController.js');

const passport = require('passport');
const path = require('path');

require('./../middleware/passport')(passport);

//Auth controller
router.post('/auth/register', AuthController.register);
router.post('/auth/login', AuthController.login);
router.post('/auth/logout', AuthController.logout);

//Admin 
router.post('/admin/addLocationCategory', AdminController.addLocationCategory);

//User
router.get('/users/forgotPassword/:phoneNumber', UserController.forgotPassword);
// router.get('/users/detail/:userId', passport.authenticate('jwt', {
// 	session: false,
// }), UserController.getUserById);
router.get('/users/detail/:userId', UserController.getUserById);

//Location Category
router.get('/location/locationCategories', LocationController.getLocationCategories);

//location
router.get('/location/profile/:id', LocationController.getLocationProfile);

/************************/
//Product
router.post('/product/add', ProductController.addProduct);
router.get('/product/productByUserIds/:ownerId', ProductController.getProductByIds);
router.put('/product/delete', ProductController.deleteProduct);
router.put('/product/update', ProductController.updateProduct);
router.get('/product/:id', ProductController.getProductDetailById);

// get product category
router.get('/product/productParentCategories/:ownerId', ProductController.getProductParentCategories);
router.post('/product/addProductParentCategory', ProductController.addProductParentCategory);
router.put('/product/updateProductCategory', ProductController.updateProductParentCategory);

//Phone
router.post('/phone/sms', PhoneController.sendPhoneVerifyCode);
router.post('/phone/verify', PhoneController.verifyPhoneVerifyCode);

// Upload to Cloudinary
router.get('/wake-up', (req, res) => res.send('👌'))
router.post('/image-upload', UploadController.uploadImage);

router.get('/test', (req, res, next) => {
  res.json({ message: 'test'});
});
module.exports = router;