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

// const getLocation = async (req, res) => {
//   res.setHeader('Content-Type', 'application/json');
//   let error, location;
//   [erro, location] = await to(()=>{
//     try{
//       return await Location.find({ hiddenFlag: false });
//     }catch {
//       return TE(res, 'Get locationCategories failed', 503)
//     }
//   });
//   if (erro) {
//     return ReE(res, 'Get locationCategories failed', 422);
//   }	
//   if (location) {
//     return ReS(res, { message: 'Get location success', location: location }, 200);
//   }
//   else {
//     return ReE(res, 'Get locationCategories failed', 503);
//   }

// }



module.exports.getLocationCategories = getLocationCategories;