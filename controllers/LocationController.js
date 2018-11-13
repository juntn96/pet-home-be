const locationService = require('../services/LocationService');
const Location = require('../models/Location');

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


const getLocationProfile = async function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  let erro, locationProfile;
  [erro, locationProfile] = await to(locationService.getLocationProfile(req.params.id));
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