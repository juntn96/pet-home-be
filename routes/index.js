const express = require('express');
const router = express.Router();

const AuthController = require('./../controllers/AuthController');
const PhoneController = require('./../controllers/PhoneController');
const AdminController = require('./../controllers/AdminController');
const LocationController = require('./../controllers/LocationController');
const UserController = require('./../controllers/UserController');

//Auth controller
router.post('/auth/register', AuthController.register);
router.post('/auth/login', AuthController.login);
router.post('/auth/logout', AuthController.logout);

//Admin 
router.post('/admin/addLocationCategory', AdminController.addLocationCategory);

//User
router.get('/users/forgotPassword/:phoneNumber', UserController.forgotPassword);

//Location Category
router.get('/location/locationCategories', LocationController.getLocationCategories);

//Phone
router.post('/phone/sms', PhoneController.sendPhoneVerifyCode);
router.post('/phone/verify', PhoneController.verifyPhoneVerifyCode);

router.get('/test', (req, res, next) => {
  res.json({ message: 'test'});
});
module.exports = router;