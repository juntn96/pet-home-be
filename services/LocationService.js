const LocationCategory = require('../models/LocationCategory');
const Location = require('../models/Location');
const constants = require('../utils/constants');

const getLocationCategories = async () => {
	try {
    let listLocationCategory = await LocationCategory.find({ hiddenFlag: false, typeLocation: constants.PRIVATE_LOCATION });
		return listLocationCategory;
	}
	catch (e) {
		return TE(res, 'Get locationCategories failed', 503);
	}		
};
module.exports.getLocationCategories = getLocationCategories;

const getLocationProfile = async (id) => {
	try {
    let getProfile = await LocationModel.findOne({ownerId: id}).populate('ownerId').populate('typeId');
		return getProfile;
	}
	catch (e) {
		return TE(res, 'Get getLocationProfile failed', 503);
	}		
};
module.exports.getLocationProfile = getLocationProfile;

const searchNearByLatLong = async (locationDetail) => {
	try {
    let listLocations = await Location.find({
      location: {
       $nearSphere: {
        $geometry: {
         type: 'Point',
         coordinates: [ locationDetail.long , locationDetail.lat ]
        },
        $maxDistance: locationDetail.radius,
        $minDistance: 0
       }
      }
     });
		return listLocations;
	} catch (e) {
    console.log(e);
		return TE(res, 'Get locations failed', 503);
	}		
};
module.exports.searchNearByLatLong = searchNearByLatLong;

const searchDist = async (locationDetail) => {
	try {
    let listLocations = await Location.aggregate([
      {
        $geoNear: {
          near: { type: "Point", coordinates: [ locationDetail.long , locationDetail.lat ] },
          key: "location",
          distanceField: "dist.calculated",
          maxDistance: locationDetail.radius,
          minDistance: 0,
          includeLocs: "dist.location",
          spherical: true
        }
      },
      { "$skip": 0 },
      // { "$limit": 5 }
    ]);
		return listLocations;
	} catch (e) {
    console.log(e);
		return TE(res, 'Get locations failed', 503);
	}		
};
module.exports.searchDist = searchDist;