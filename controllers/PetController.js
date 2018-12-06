const PetService = require("../services/PetService");

const add = async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  try {
    const ownerId = req.body.ownerId;
    const name = req.body.name;
    const age = req.body.age;
    const breed = req.body.breed;
    const branch = req.body.branch;
    const gender = req.body.gender;
    const description = req.body.description;
    const images = req.body.images;

    const data = {
      ownerId,
      name,
      age,
      breed,
      branch,
      gender,
      description,
      images,
    };

    const result = await PetService.add(data);
    return ReS(res, { result }, 200);
  } catch (error) {
    return ReE(res, error, 422);
  }
};

const getByUser = async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  try {
    const result = await PetService.getByUser(req.params.userId);
    return ReS(res, { result }, 200);
  } catch (error) {
    return ReE(res, error, 422);
  }
};

const deletePet = async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  try {
    const id = req.body.id;
    const result = await PetService.deletePet(id);
    return ReS(res, { result }, 200);
  } catch (error) {
    return ReE(res, error, 422);
  }
};

const editPet = async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  try {
    const petId = req.body.petId;
    const updateOptions = req.body.updateOptions;
    const result = await PetService.editPet(petId, updateOptions);
    return ReS(res, { result }, 200);
  } catch (error) {
    return ReE(res, error, 422);
  }
};

const addUserLikePet = async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  try {
    const petId = req.body.petId;
    const favoritedId = req.body.favoritedId;
    const result = await PetService.addUserLikePet(petId, favoritedId);
    return ReS(res, { result }, 200);
  } catch (error) {
    return ReE(res, error, 422);
  }
};

const addUserIgnorePet = async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  try {
    const petId = req.body.petId;
    const ignoredId = req.body.ignoredId;
    const result = await PetService.addUserIgnorePet(petId, ignoredId);
    return ReS(res, { result }, 200);
  } catch (error) {
    return ReE(res, error, 422);
  }
};

const getLikeNumber = async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  try {
    const petId = req.body.petId;
    const totalLikes = await PetService.getLikeNumber(petId);
    return ReS(res, { totalLikes }, 200);
  } catch (error) {
    return ReE(res, error, 422);
  }
};

const getNotIgnoredPet = async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  try {
    const userId = req.params.userId;
    const result = await PetService.getNotIgnoredPet(userId);
    return ReS(res, { result }, 200);
  } catch (error) {
    return ReE(res, error, 422);
  }
};

module.exports = {
  add,
  getByUser,
  deletePet,
  editPet,
  addUserLikePet,
  addUserIgnorePet,
  getLikeNumber,
  getNotIgnoredPet,
};
