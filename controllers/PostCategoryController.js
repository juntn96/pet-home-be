const postCategoryService = require("../services/PostCategoryService");

const add = async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  try {
    const name = req.body.name;
    const data = { name };
    const result = await postCategoryService.add(data);
    return ReS(res, { result }, 200);
  } catch (error) {
    return ReE(res, error, 422);
  }
};

const get = async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  try {
    const categories = await postCategoryService.getAll();
    return ReS(res, { categories }, 200);
  } catch (error) {
    return ReE(res, error, 422);
  }
};

const findByName = async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  try {
    const name = req.body.name;
    const result = await postCategoryService.findByName(name);
    return ReS(res, { result }, 200);
  } catch (error) {
    return ReE(res, error, 422);
  }
};

const deleteById = async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  try {
    const id = req.body.id;
    const result = await postCategoryService.deleteById(id);
    return ReS(res, { result }, 200);
  } catch (error) {
    return ReE(res, error, 422);
  }
};

const updateNameById = async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  try {
    const id = req.body.id;
    const name = req.body.name;
    const result = await postCategoryService.updateNameById(id, name);
    return ReS(res, { result }, 200);
  } catch (error) {
    return ReE(res, error, 422);
  }
};

module.exports = {
  add,
  get,
  deleteById,
  findByName,
  updateNameById,
};
