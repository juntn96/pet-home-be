const LocationCategory = require('../models/LocationCategory');
const Location = require('../models/Location');
const Product =require('../models/Product');
const constants = require('../utils/constants');

const getLocationCategoriesByType = async () => {
	try {
    let listLocationCategory = await LocationCategory.find({ hiddenFlag: false, typeLocation: constants.PRIVATE_LOCATION });
		return listLocationCategory;
	}
	catch (e) {
		return TE(res, 'Get locationCategories failed', 503);
	}		
};
module.exports.getLocationCategoriesByType = getLocationCategoriesByType;

const getLocationCategories = async () => {
  try {
    let listLocationCategory = await LocationCategory.aggregate([
      { "$addFields": { "typeId": { "$toString": "$_id" } } }, {
        $lookup:
        {
          from: 'locations',
          localField: 'typeId',
          foreignField: 'typeId',
          as: 'locationCate'
        }
      }, {
        $project: {
          name: 1, hiddenFlag: 1,
          updatedAt: 1,
          typeLocation: 1, count: { $size: "$locationCate" }
        },
        
      },{ $sort : { updatedAt : 1 } }
    ])
    return listLocationCategory;
  }
  catch (e) {
    return TE(res, 'Get locationCategories failed', 503);
  }
};
module.exports.getLocationCategories = getLocationCategories;

const addLocationCategory = async val => {
  try {
    const nameExisted = await findByName(val);
    if (nameExisted) throw ("Đã có loại địa điểm này");
    // const category = new LocationCategory();
    const result = await LocationCategory.create({ name: val , typeLocation: constants.PRIVATE_LOCATION});
    return result;
  } catch (error) {
    console.log(error)
    throw error;
  }
};
module.exports.addLocationCategory = addLocationCategory;

const findByName = async val => {
  try {
    const result = await LocationCategory.findOne({ name: val });
    return result;
  } catch (error) {
    throw error;
  }
};

const updateLocationCategoryById = async (id, field,value) => {
  try {
    let result = null;
    if (field === 'name'){
      const nameExisted = await findByName(value);
      if (nameExisted) {
        throw ("Đã có loại địa điểm này");
      }
      result = await LocationCategory.findByIdAndUpdate(id, { name : value });
    }
    else 
      result = await LocationCategory.findByIdAndUpdate(id, { hiddenFlag : value });
    return result;
  } catch (error) {
    throw error;
  }
};
module.exports.updateLocationCategoryById = updateLocationCategoryById;

const getTotalCountLocationByTypeId = async (id) => {
  try {
    let res = await Location.aggregate().group({ _id: '$typeId', total: { $sum: 1 } });
    return res;
  }
  catch (e) {
    return TE(res, 'Get locationCategories failed', 503);
  }
};
module.exports.getTotalCountLocationByTypeId = getTotalCountLocationByTypeId;

const getLocationProfile = async (ownerId) => {
  try {
    let getProfile = await Location.find({ ownerId: ownerId });
    console.log(getProfile);
    return getProfile;
  }
  catch (e) {
    return TE(res, 'Get getLocationProfile failed', 503);
  }
};
module.exports.getLocationProfile = getLocationProfile;

const getLocationWithAllProduct = async (ownerId) => {
  try {
    let getLocation = await Location.find({ ownerId: ownerId }).populate({path: 'typeId'});
    let locationProduct = getLocation[0];
    
    let product = await Product.find({ ownerId: ownerId });
    locationProduct.products = product;
    return {
      long: locationProduct.location.coordinates[0],
      lat: locationProduct.location.coordinates[1],
      systemRating: locationProduct.systemRating,
      ownerId: locationProduct.ownerId,
      typeId: locationProduct.typeId,
      address: locationProduct.address,
      description: locationProduct.description,
      images: locationProduct.images,
      products: product
    }
  }
  catch (e) {
    return TE(res, 'Get getLocationProfile failed', 503);
  }
};
module.exports.getLocationWithAllProduct = getLocationWithAllProduct;

const searchNearByLatLong = async (locationDetail) => {
  try {
    let listLocations = await Location.find({
      location: {
        $nearSphere: {
          $geometry: {
            type: 'Point',
            coordinates: [locationDetail.long, locationDetail.lat]
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
          near: { type: "Point", coordinates: [long, lat] },
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


const getAllLocations = async () => {
  try {
    let listLocationCategory = await Location.find().populate('ownerId').populate('typeId')
    return listLocationCategory;
  }
  catch (e) {
    return TE(res, 'Get locationCategories failed', 503);
  }
};
module.exports.getAllLocations = getAllLocations;

const hideLocationById = async (id, deletionFlag) => {
  try {
    let listLocationCategory = await Location.findByIdAndUpdate(id, {deletionFlag: deletionFlag})
    return listLocationCategory;
  }
  catch (e) {
    return TE(res, 'Get locationCategories failed', 503);
  }
};
module.exports.hideLocationById = hideLocationById;

const getLocationById = async (id) => {
  try {
    let locaiton = await Location.findById(id);
    return locaiton;
  }
  catch (e) {
    return TE(res, 'Get location failed', 503);
  }
};
module.exports.getLocationById = getLocationById;