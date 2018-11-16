const LocationCategory = require('../models/LocationCategory');
const LocationModel = require('../models/Location');
const constants = require('../utils/constants');
const getLocationCategories = async () => {
	try {
    let listLocationCategory = await LocationCategory.find({ hiddenFlag: false, type: constants.PRIVATE_LOCATION });
		return listLocationCategory;
	}
	catch (e) {
		return TE(res, 'Get locationCategories failed', 503);
	}		
};
module.exports.getLocationCategories = getLocationCategories;

// get profile
const getLocationProfile = async (id) => {
	try {
    let getProfile = await LocationModel.findOne({ownerId: id}).populate('ownerId');
		return getProfile;
	}
	catch (e) {
		return TE(res, 'Get getLocationProfile failed', 503);
	}		
};
module.exports.getLocationProfile = getLocationProfile;