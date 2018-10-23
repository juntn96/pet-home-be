const express = require('express');
const router = express.Router();

const AuthController = require('./../controllers/AuthController');
const PhoneController = require('./../controllers/PhoneController');

//Auth controller
router.post('/auth/register', AuthController.register);
router.post('/auth/login', AuthController.login);
router.post('/auth/logout', AuthController.logout);

//Phone
router.post('/phone/sms', PhoneController.sendPhoneVerifyCode);
router.post('/phone/verify', PhoneController.verifyPhoneVerifyCode);

router.get('/test', (req, res, next) => {
  res.json({ message: 'test'});
});
module.exports = router;