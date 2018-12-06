const LocationCategory = require('../models/LocationCategory');
const Location = require('../models/Location');
const constants = require('../utils/constants');

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
    console.log(e);
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
      // { "$limit": 5 }
    ]);
    let newArrays = listLocations.map(item => {
      const { _id, address, name, deletionFlag, dist } = item;
      return {
        _id, address, name, deletionFlag, dist
      }
    })
    return newArrays;
  } catch (e) {
    console.log(e);
    return TE(res, 'Get locations failed', 503);
  }
};
module.exports.searchDist = searchDist;
