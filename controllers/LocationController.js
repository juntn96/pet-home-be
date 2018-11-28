const locationService = require('../services/LocationService');
const Location = require('../models/Location');

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

const searchDist = async function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  let erro, locations;
  [erro, locations] = await to(locationService.searchDist(req.params));
  if (erro) {
    return ReE(res, 'Get locations dist failed', 422);
  }	
  if (locations) {
    return ReS(res, { message: 'Get locations dist success', locationCategories: locations }, 200);
  }
  else {
    return ReE(res, 'Get locations dist failed', 503);
  }  				
};
module.exports.searchDist = searchDist;