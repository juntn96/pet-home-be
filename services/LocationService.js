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

const getLocationProfile = async (ownerId) => {
	try {
    let getProfile = await Location.find({ownerId: ownerId});
    console.log(getProfile);
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
		return TE(res, 'Get locations failed', 503);
	}		
};
module.exports.searchNearByLatLong = searchNearByLatLong;

const searchDist = async (locationDetail) => {

  let long = parseFloat(locationDetail.long);
  let lat = parseFloat(locationDetail.lat);
  let radius = parseInt(locationDetail.radius);
	try {
    let listLocations = await Location.aggregate([
      {
        $geoNear: {
          near: { type: "Point", coordinates: [ long , lat ] },
          key: "location",
          distanceField: "dist.calculated",
          maxDistance: radius,
          minDistance: 0,
          includeLocs: "dist.location",
          spherical: true
        }
      },
      { "$skip": 0 },
    ]).exec(function (err, docs) {
      if(err) return err;
      LocationCategory.populate(docs, { path: 'typeId' }, function (err, populatedTransactions) {
        if (err) return err;
        return populatedTransactions;
      });
    });
	} catch (e) {
		return e;
	}		
};
module.exports.searchDist = searchDist;

const updateLocation = async (locationDetail) => {
  console.log(locationDetail);
  [error, locaion] = await to(Location.findByIdAndUpdate(locationDetail._id,locationDetail));
  if (error) TE(error);
}
module.exports.updateLocation= updateLocation;
