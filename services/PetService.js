const Pet = require('./../models/Pet');

const add = async data => {
  try {
    const pet = new Pet(data);
    const result = await pet.save();
    return result;
  } catch (error) {
    throw error;
  }
};

const get = async () => {
  try {
    const pets = await Pet.find();
    return pets;
  } catch (error) {
    throw error;
  }
};

const deletePet = async _id => {
  try {
    const result = await Pet.findByIdAndRemove(_id);
    return result;
  } catch (error) {
    throw error;
  }
};

const editPet = async (petId, updateOptions) => {
  try {
    const options = {};
    for (const opt of updateOptions) {
      options[opt.propName] = opt.value;
    }
    const result = await Pet.findByIdAndUpdate(
      petId,
      {
        $set: options,
      },
      {
        new: true,
      }
    );
    return result;
  } catch (error) {
    throw error;
  }
};

const addUserLikePet = async (petId, likeId) => {
  try {
    const result = await Pet.findByIdAndUpdate(petId, {
      $push: {
        likes: {
          userId: likeId,
        },
      },
    });
    return result;
  } catch (error) {
    return error;
  }
};

const addUserIgnorePet = async (petId, ignoreId) => {
  try {
    const result = await Pet.findByIdAndUpdate(petId, {
      $push: {
        ignores: {
          userId: ignoreId,
        },
      },
    });
    return result;
  } catch (error) {
    return error;
  }
};

const getLikeNumber = async petId => {
  try {
    const result = await Pet.findById(petId);
    return result.likes.length;
  } catch (error) {
    return error;
  }
};

const getNotIgnoredPet = async userId => {
  try {
    console.log(userId);
    const result = await Pet.find({
      "ignores.userId": { $ne: userId }
    }
    ).sort({ likes: -1 });
    return result;
  } catch (error) {
    return error;
  }
};

module.exports = {
  add,
  get,
  deletePet,
  editPet,
  addUserLikePet,
  addUserIgnorePet,
  getLikeNumber,
  getNotIgnoredPet,
};