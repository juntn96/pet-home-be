const User = require('./../models/User');
const Location = require('./../models/Location');
const validator = require('validator');
const constants = require('./../utils/constants');

const createUser = async (userDetail, avatar) => {
	let userInfo;
	try {
		userInfo = JSON.parse(userDetail);
		userInfo.avatar = avatar;
	} catch (e) {
		return TE('Vui lòng nhập Role của User');
	}
	let auth_info, err;
	auth_info = {};
	auth_info.status = 'create';
	if (validator.isMobilePhone(userInfo.phoneNumber, 'any')) {
		auth_info.method = 'phone';
		let user;
		[err, user] = await to(User.create(userInfo));
		if (err) TE('Số điện thoại đã được đăng ký');
		if (user.role === constants.ROLE_USER) {
			// To do
		}
		if (user.role === constants.ROLE_LOCATION_MANAGER) {
			var location = new Location({
        address: userInfo.locationAddress,
        name: userInfo.locationName,
        ownerId: userInfo.ownerId,
        typeId: userInfo.typeId,
        systemRating: constants.FIRST_RATTING,
        deletionFlag: constants.NOT_DELETED_ENTITY,
			});
			let error, loca;
			[error, loca] = await to(Location.create(location));
			if (error) {
				TE('Error save location');
			}
		}
		return user;
	} else {
		TE('A valid email or phone number was not entered.');
	}
};
module.exports.createUser = createUser;

const authUser = async (userInfo) => { //returns token
	let auth_info = {};
	auth_info.status = 'login';
	if (!userInfo.phoneNumber || !userInfo.password) TE('Vui lòng nhập số điện thoại và mật khẩu để đăng nhập');
	let user;
	if (validator.isMobilePhone(userInfo.phoneNumber, 'any')) { //checks if only phone number was sent
		auth_info.method = 'phone';
		[err, user] = await to(User.findOne({
			phoneNumber: userInfo.phoneNumber,
		}));
		if (err) TE(err.message);

	} else {
		TE('Vui lòng nhập 1 số điện thoại di động tại Việt Nam');
	}
	if (!user) TE('Số điện thoại chưa được đăng ký');
	[err, user] = await to(user.comparePassword(userInfo.password));
	console.log(err);
	if (err) TE('Mật khẩu không chính xác');
	return user;
};
module.exports.authUser = authUser;

