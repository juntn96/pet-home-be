const LocationCategory = require('./../models/LocationCategory');

const createLocationCategory = async (locationCategoryDetail) => {
	let locationCategory, err;
	[err, locationCategory] = await to(LocationCategory.create(locationCategoryDetail));		
};
module.exports.createLocationCategory = createLocationCategory;