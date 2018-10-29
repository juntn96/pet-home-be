const authService = require('./../services/AuthService');
const User = require('../models/User');
const constants = require('../utils/constants');
const phoneService = require('./../services/PhoneService');

const forgotPassword = async function (req, res) {
  console.log(req.params)
	if (!req.params.phoneNumber) {
		ReS(res, { message: 'Bad request' }, 400);
	}
	else {
    let objUser = await User.findOne({ phoneNumber: req.params.phoneNumber });
    
		if (objUser) {
			const newPassword = 'Ph@' + Math.floor(10000 + 89999 * Math.random());
			objUser.set({ password: newPassword });
			let objUserReturn = await objUser.save();
			if (objUserReturn) {
				let [errors, status] = await to(phoneService.sendSMSPassword(req.params.phoneNumber, newPassword));
				if (errors) {
					return ReEM2(res, 'Có lỗi khi gửi message!',400);
				} else {
					return ReS(res, {
						status: true,
						message: 'Mật khẩu mới đã được gửi tới số điện thoại của bạn!',
					}, 200);
				}
			}
		}
		else {
			return ReEM2(res, 'Số điện thoại không đúng.', 404);
		}
	}
};
module.exports.forgotPassword = forgotPassword;