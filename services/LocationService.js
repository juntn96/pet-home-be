const LocationCategory = require('../models/LocationCategory');

const getLocationCategories = async () => {
	try {
    let listLocationCategory = await LocationCategory.find({ hiddenFlag: false });
		return listLocationCategory;
	}
	catch (e) {
		return TE(res, 'Get locationCategories failed', 503);
	}		
};
module.exports.getLocationCategories = getLocationCategories;
