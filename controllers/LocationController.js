const locationService = require('../services/LocationService');
const Location = require('../models/Location');
const LocationCategory = require('../models/LocationCategory');

// @route   GET api/location/locationCategories
// @desc    Get location category
// @access  Public
const getLocationCategories = async function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  let erro, locationCategories;
  [erro, locationCategories] = await to(locationService.getLocationCategories());
  if (erro) {
    return ReE(res, 'Get locationCategories failed', 422);
  }	
  if (locationCategories) {
    return ReS(res, { message: 'Get locationCategories success', locationCategories: locationCategories }, 200);
  }
  else {
    return ReE(res, 'Get locationCategories failed', 503);
  }
  				
};
module.exports.getLocationCategories = getLocationCategories;

// @route   GET api/location/profile/:id
// @desc    Get location by user_id
// @access  Public
const getLocationProfile = async function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  let erro, locationProfile;
  console.log(req.params);
  [erro, locationProfile] = await to(locationService.getLocationProfile(req.params.ownerId));
  if (erro) {
    return ReE(res, 'Get getLocationProfile failed', 422);
  }	
  if (locationProfile) {
    return ReS(res, { message: 'Get getLocationProfile success', locationProfile: locationProfile }, 200);
  }
  else {
    return ReE(res, 'Get getLocationProfile failed', 503);
  } 				
};
module.exports.getLocationProfile = getLocationProfile;

const searchNearByLatLong = async function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  let erro, locations;
  [erro, locations] = await to(locationService.searchNearByLatLong(req.params));
  if (erro) {
    return ReE(res, 'Get locations failed', 422);
  }	
  if (locations) {
    return ReS(res, { message: 'Get locations success', locationCategories: locations }, 200);
  }
  else {
    return ReE(res, 'Get locations failed', 503);
  }				
};
module.exports.searchNearByLatLong = searchNearByLatLong;

// const searchDist = async function (req, res) {
//   res.setHeader('Content-Type', 'application/json');
//   let erro, locations;
//   [erro, locations] = await to(locationService.searchDist(req.params));
//   if (erro) {
//     return ReE(res, 'Get locations dist failed', 422);
//   }	
//   if (locations) {
//     return ReS(res, { message: 'Get locations dist success', locations: locations }, 200);
//   }
//   else {
//     return ReE(res, 'Get locations dist failed', 503);
//   }  				
// };
// module.exports.searchDist = searchDist;

const searchDist = async function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  let long = parseFloat(req.params.long);
  let lat = parseFloat(req.params.lat);
  let radius = parseInt(req.params.radius);
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
      LocationCategory.populate(docs, { path: 'typeId' }, function (err, populatedTransactions) {
        if (err) return err;
        const listLocation = populatedTransactions.map(item  => {
          const { _id, location, deletionFlag, address,
            name, typeId, systemRating, description, images, dist } = item;
          const { calculated } = dist;
          const { coordinates } = location;
          const coordinate = {
            longitude: coordinates[0],
            latitude: coordinates[1]
          }        
          const distance = calculated.toFixed(0);
          let distanceField;
          if(distance < 1000) {
            distanceField = distance + 'm';
          } else {
            distanceField = (distance / 1000).toFixed(1) + 'km';
          }
          return {
            _id, deletionFlag, address,
            name, typeId, systemRating, description, images, distanceField ,coordinate
          }
        })
        return ReS(res, { listLocation }, 200);
      });
    });
	} catch (e) {
		return ReE(res, error, 422);
	}					
};
module.exports.searchDist = searchDist;



const updateLocation = async (req, res)=> {
  res.setHeader('Content-Type', 'application/json');
  let error, location;
  [error, location] = await to(locationService.updateLocation(req.body));
  if (error) return ReE(res, 'Không cập nhật địa điểm', 422);
  return ReS(res, {
    message: 'Update location successfully'
  }, 200);
}
module.exports.updateLocation = updateLocation;