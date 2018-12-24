const LocationReview = require("../models/LocationReview");

const getRate = async locationId => {
  try {
    const result = await LocationReview.find({ locationId });
    return result;
  } catch (error) {
    throw error;
  }
};

const addRate = async review => {
  try {
    const rated = await isRated(review.locationId, review.reviewerId);
    if (rated) return "Bạn đã đánh giá địa điểm này";
    const rv = new LocationReview(review);
    const result = await LocationReview.create(rv);
    return result;
  } catch (error) {
    throw error;
  }
};

const isRated = async (locationId, userId) => {
  try {
    const result = await LocationReview.findOne({
      locationId,
      reviewerId: userId,
    });
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getRate,
  addRate,
};
