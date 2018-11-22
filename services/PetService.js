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

module.exports = {
  add,
  get,
  deletePet,
  editPet,
}