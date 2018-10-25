const phoneService = require('./../services/PhoneService');
const PhoneVerification = require('../models/PhoneVerification');

const sendPhoneVerifyCode = async function (req, res) {
	res.setHeader('Content-Type', 'application/json');
  const body = req.body;
  console.log(req.body.phone);
	const vietnamesePhoneRegex = /(03|09|01[2|6|8|9])+([0-9]{8})\b/;
	if (!body.phone || !vietnamesePhoneRegex.test(body.phone)) {
		return ReE(res, 'Vui lòng nhập số điện thoại để xác minh', 400);
	} else {
		let errors, status;
		[errors, status] = await to(phoneService.sendSMSVerification(body.phone));
		if (errors) {
			return ReE(res, 'Gửi SMS không thành công', 400);
		} else {
			return ReS(res, {
				status: 'success',
        message: 'Mã code đã gửi đến bạn thành công',
        phone: body.phone
			}, 200);
		}
	}
};
module.exports.sendPhoneVerifyCode = sendPhoneVerifyCode;

const verifyPhoneVerifyCode = async function (req, res) {
	res.setHeader('Content-Type', 'application/json');
	const body = req.body;
	if (!body.phoneNumber || !body.code) {
		return ReE(res, 'Vui lòng nhập số điện thoại và code');
	} else {
		PhoneVerification.find({
			phoneNumber: body.phoneNumber,
			code: body.code
		}, (err, results) => {
			if (err) {
				return ReE(res, err, 500);
			}
			if (results && results.length === 0) {
				return ReE(res, 'Mã code không chính xác', 400);
			}
			const phone = results[0];
			if(new Date().getTime() - new Date(phone.updatedAt).getTime() > CONFIG.EXPIRATION_SMS_CODE){
				return ReE(res, 'Mã code đã hết hạn', 400);
			}
			return ReS(res, {
				status: 'success',
				message: 'INFO0002'
			}, 200);

		});
	}
};
module.exports.verifyPhoneVerifyCode = verifyPhoneVerifyCode;
