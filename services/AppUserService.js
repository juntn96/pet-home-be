const User = require("../models/User");

const createUser = async data => {
  try {
    const userExisted = await findUserByFbId(data.facebookId);
    if (userExisted) return userExisted;
    const user = new User(data);
    const result = await User.create(user);
    return result;
  } catch (error) {
    throw error;
  }
};

const findUserByFbId = async facebookId => {
  try {
    const result = await User.findOne({ facebookId });
    return result;
  } catch (error) {
    throw error;
  }
};

const addExpoToken = async ({ userId, expoToken }) => {
  try {
    const result = await User.findByIdAndUpdate(userId, {
      $set: {
        expoToken,
      },
    });
    return result;
  } catch (error) {
    throw error;
  }
};

const removeExpoToken = async ({ userId }) => {
  try {
    const result = await User.findByIdAndUpdate(userId, {
      $set: {
        expoToken: null,
      },
    });
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createUser,
  addExpoToken,
  removeExpoToken,
  findUserByFbId
};
