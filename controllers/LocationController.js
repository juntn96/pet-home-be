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


const getLocationCategoriesByType = async function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  let erro, locationCategories;
  [erro, locationCategories] = await to(locationService.getLocationCategoriesByType());
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
module.exports.getLocationCategoriesByType = getLocationCategoriesByType;

const updateLocationCategories = async function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  try {
    const result = await locationService.updateLocationCategoryById(req.body.id,req.body.field,req.body.value);
    return ReS(res, { result }, 200);
  } catch (error) {
    return ReE(res, error, 422);
  }
};
module.exports.updateLocationCategories = updateLocationCategories;

const addLocationCategory = async function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  try {
    const result = await locationService.addLocationCategory(req.body.name);
    // console.log('>> ', result)
    return ReS(res, { result }, 200);
  } catch (error) {
    return ReE(res, error, 422);
  }
};

module.exports.addLocationCategory = addLocationCategory;

// @route   GET api/location/profile/:id
// @desc    Get location by user_id
// @access  Public
const getLocationProfile = async function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  let erro, locationProfile;
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

const getLocationWithAllProduct = async function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  let erro, locationDetail;
  [erro, locationDetail] = await to(locationService.getLocationWithAllProduct(req.query));
  if (erro) {
    return ReE(res, 'Get location and product failed', 422);
  }	
  if (locationDetail) {
    return ReS(res, { message: 'Get location and product success', locationDetail: locationDetail }, 200);
  }
  else {
    return ReE(res, 'Get location and product failed', 503);
  } 				
};
module.exports.getLocationWithAllProduct = getLocationWithAllProduct;

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

const searchLocationByCategory = async function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  let listLocations = [];
  const typeIdArray = req.query.typeIdArray;
  // const typeIdArray = [ { typeId: "5bedabb2b3c51a06927c35bb"} ] ;
  // const search_keyword = "FPT";
  try {
    if(req.query.typeIdArray){
      listLocations = await Location.find({      
        deletionFlag: false,
        // $text: { $search: search_keyword }, 
        $and: [
          { $or : typeIdArray }
        ]
      }).populate({ path: 'typeId' })
      return ReS(res, { listLocations }, 200);
    }
  } catch (e) {
		return ReE(res, error, 422);
	}		
}
module.exports.searchLocationByCategory = searchLocationByCategory;

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
        // console.log(populatedTransactions)
        if (err) return err;
        const listLocation = populatedTransactions.map(item  => {
          const { _id, location, deletionFlag, address,
            name, typeId, systemRating, description, images, dist, ownerId } = item;
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
            _id, 
            deletionFlag, 
            address,
            name, 
            typeId, 
            systemRating, 
            description, 
            images, 
            distance: distanceField,
            coordinate,
            ownerId
          }
        }).filter(item => item.deletionFlag !== true);
        return ReS(res, { listLocation }, 200);
      });
    });
	} catch (e) {
		return ReE(res, error, 422);
	}					
};
module.exports.searchDist = searchDist;

const getAllLocations = async function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  let erro, location;
  [erro, location] = await to(locationService.getAllLocations());
  if (erro) {
    return ReE(res, 'Get location failed', 422);
  }	
  if (location) {
    return ReS(res, { message: 'Get location success', locations: location }, 200);
  }
  else {
    return ReE(res, 'Get location failed', 503);
  }
};
module.exports.getAllLocations = getAllLocations;

const getAllActiveLocation = async function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  let erro, location;
  [erro, location] = await to(locationService.getAllActiveLocation());
  if (erro) {
    return ReE(res, 'Get location failed', 422);
  }	
  if (location) {
    return ReS(res, { message: 'Get location success', locations: location }, 200);
  }
  else {
    return ReE(res, 'Get location failed', 503);
  }
};
module.exports.getAllActiveLocation = getAllActiveLocation;

const searchAllLocations = async function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  // console.log("-----------------------BEGIN");
  // console.log(req.query.search_keyword === '');
  // console.log("-----------------------BEGIN");
  // if(req.query.search_keyword){
  //   console.log('co search_keyword')
  // } else {
  //   console.log('KHONG CO');
  // }
  const ratingGt = req.query.ratingGt;
  const ratingLt = req.query.ratingLt;
  const radius = parseInt(req.query.radius);
  const lat = parseFloat(req.query.lat);
  const long = parseFloat(req.query.long);
  const typeIdArray = req.query.typeIdArray;
  let listLocations = [];
  let listLocationDist = [];
  
	try {
    if (req.query.search_keyword && req.query.ratingGt && req.query.radius && req.query.lat) {
      listLocations = await Location.find({      
          deletionFlag: false,
          $text: { $search: search_keyword }, 
          location : {
            $geoWithin: { $centerSphere: [ [ long, lat ], radius * 0.000621371 / 3963.2] }
          },
          systemRating: { $gte: ratingGt , $lte: ratingLt}
        }
      );
      let result = await Location.aggregate([
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
          listLocationDist = populatedTransactions.map(item  => {
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
              name, typeId, systemRating, description, images, distance: distanceField ,coordinate
            }
          });
          let result2 = [];
          for (let index1 = 0; index1 < listLocationDist.length; index1++) {
            for (let index2 = 0; index2 < listLocations.length; index2++) {
              if(listLocationDist[index1]._id.toString() === listLocations[index2]._id.toString()) {
                result2.push(listLocationDist[index1]);                
              }
            }
          }
          return ReS(res, { listLocations: result2 }, 200);
        });
      });
    } else if (req.query.search_keyword && !req.query.lat && !req.query.ratingGt) {
      listLocations = await Location.find({  
          deletionFlag: false,    
          $text: { $search: search_keyword , $language: 'none', $diacriticSensitive: false, $caseSensitive: false}, 
        }
      ).populate({ path: 'typeId' });
      return ReS(res, { listLocations }, 200);
    } else if (req.query.ratingGt && !req.query.lat && !req.query.search_keyword) {
      listLocations = await Location.find({  
          deletionFlag: false,    
          systemRating: { $gte: ratingGt , $lte: ratingLt}
        }
      ).populate({ path: 'typeId' });
      return ReS(res, { listLocations }, 200);
    } else if (req.query.search_keyword && req.query.ratingGt && !req.query.lat) {
      listLocations = await Location.find({      
          deletionFlag: false,
          $text: { $search: search_keyword , $language: 'none', $diacriticSensitive: false, $caseSensitive: false},
          systemRating: { $gte: ratingGt , $lte: ratingLt}
        }
      ).populate({ path: 'typeId' });
      return ReS(res, { listLocations }, 200);
    } else if (req.query.ratingGt && req.query.radius && req.query.lat) {
      listLocations = await Location.find({ 
          deletionFlag: false,     
          location : {
            $geoWithin: { $centerSphere: [ [ long, lat ], radius * 0.000621371 / 3963.2] }
          },
          systemRating: { $gte: ratingGt , $lte: ratingLt}
        }
      );
      let result = await Location.aggregate([
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
          listLocationDist = populatedTransactions.map(item  => {
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
              name, typeId, systemRating, description, images, distance: distanceField ,coordinate
            }
          });
          let result2 = [];
          for (let index1 = 0; index1 < listLocationDist.length; index1++) {
            for (let index2 = 0; index2 < listLocations.length; index2++) {
              if(listLocationDist[index1]._id.toString() === listLocations[index2]._id.toString()) {
                result2.push(listLocationDist[index1]);                
              }
            }
          }
          return ReS(res, { listLocations: result2 }, 200);
        });
      });
    } else if (req.query.search_keyword && req.query.radius && req.query.lat){
      listLocations = await Location.find({   
          deletionFlag: false,   
          $text: { $search: search_keyword , $language: 'none', $diacriticSensitive: false, $caseSensitive: false}, 
          location : {
            $geoWithin: { $centerSphere: [ [ long, lat ], radius * 0.000621371 / 3963.2] }
          },
        }
      );
      let result = await Location.aggregate([
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
          listLocationDist = populatedTransactions.map(item  => {
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
              name, typeId, systemRating, description, images,distance: distanceField ,coordinate
            }
          });
          let result2 = [];
          for (let index1 = 0; index1 < listLocationDist.length; index1++) {
            for (let index2 = 0; index2 < listLocations.length; index2++) {
              if(listLocationDist[index1]._id.toString() === listLocations[index2]._id.toString()) {
                result2.push(listLocationDist[index1]);                
              }
            }
          }
          // console.log(result2);
          return ReS(res, { listLocations: result2 }, 200);
        });
      });
    } else if (req.query.radius && req.query.lat && !req.query.ratingGt && !req.query.search_keyword) {
      console.log("VAO DAY")
      listLocations = await Location.find({   
          deletionFlag: false,   
          location : {
            $geoWithin: { $centerSphere: [ [ long, lat ], radius * 0.000621371 / 3963.2] }
          },
        }
      );
      let result = await Location.aggregate([
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
          listLocationDist = populatedTransactions.map(item  => {
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
              name, typeId, systemRating, description, images, distance: distanceField ,coordinate
            }
          });
          let result2 = [];
          for (let index1 = 0; index1 < listLocationDist.length; index1++) {
            for (let index2 = 0; index2 < listLocations.length; index2++) {
              if(listLocationDist[index1]._id.toString() === listLocations[index2]._id.toString()) {
                result2.push(listLocationDist[index1]);                
              }
            }
          }
          return ReS(res, { listLocations: result2 }, 200);
        });
      });
    } else if (req.query.typeIdArray && !req.query.lat && !req.query.search_keyword && !req.query.ratingGt){
      listLocations = await Location.find({      
        deletionFlag: false,
        $and: [
          { $or : typeIdArray }
        ]
      }).populate({ path: 'typeId' })
      return ReS(res, { listLocations }, 200);
    } else if (req.query.search_keyword && req.query.typeIdArray){
      listLocations = await Location.find({  
        deletionFlag: false,    
        $text: { $search: search_keyword , $language: 'none', $diacriticSensitive: false, $caseSensitive: false},
        $and: [
          { $or : typeIdArray }
        ]
      }).populate({ path: 'typeId' });
      return ReS(res, { listLocations }, 200);
    } else if (req.query.ratingGt && req.query.typeIdArray && !req.query.lat && !req.query.ratingGt) {
      listLocations = await Location.find({  
          deletionFlag: false,    
          systemRating: { $gte: ratingGt , $lte: ratingLt},
          $and: [
            { $or : typeIdArray }
          ]
        }
      ).populate({ path: 'typeId' });
      return ReS(res, { listLocations }, 200);
    } else if (req.query.search_keyword && req.query.ratingGt && req.query.typeIdArray && !req.query.search_keyword) {
      listLocations = await Location.find({      
          deletionFlag: false,
          $text: { $search: search_keyword , $language: 'none', $diacriticSensitive: false, $caseSensitive: false}, 
          systemRating: { $gte: ratingGt , $lte: ratingLt},
          $and: [
            { $or : typeIdArray }
          ]
        }
      ).populate({ path: 'typeId' });
      return ReS(res, { listLocations }, 200);
    }
	} catch (e) {
		return ReE(res, error, 422);
	}					
};
module.exports.searchAllLocations = searchAllLocations;

const updateLocation = async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  let error, location;
  [error, location] = await to(locationService.updateLocation(req.body));
  if (error) return ReE(res, 'Không cập nhật địa điểm', 422);
  return ReS(res, {
    message: 'Update location successfully'
  }, 200);
}
module.exports.updateLocation = updateLocation;