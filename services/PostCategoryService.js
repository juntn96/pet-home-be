const PostCategory = require("../models/PostCategory");

const add = async data => {
  try {
    const name = data.name;
    const nameExisted = await findByName(name);
    if (nameExisted) TEM("Đã có loại bài viết này");
    const postCategory = new PostCategory({ name });
    const result = await postCategory.save();
    return result;
  } catch (error) {
    throw error;
  }
};

const getAll = async () => {
  try {
    const result = await PostCategory.find();
    return result;
  } catch (error) {
    throw error;
  }
};

const findByName = async name => {
  try {
    const result = await PostCategory.findOne({ name });
    return result;
  } catch (error) {
    throw error;
  }
};

const findById = async id => {
  try {
    const result = await PostCategory.findById(id);
    return result;
  } catch (error) {
    throw error;
  }
};

const updateNameById = async (id, name) => {
  try {
    const result = await PostCategory.findByIdAndUpdate(id, { name });
    return result;
  } catch (error) {
    throw error;
  }
};

const deleteById = async id => {
  try {
    const result = await PostCategory.findByIdAndDelete({ _id: id });
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  add,
  getAll,
  deleteById,
  findByName,
  findById,
  updateNameById
};
