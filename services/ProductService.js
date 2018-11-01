const Product = require('./../models/Product');
const ProductParentCategory = require('./../models/ProductParentCategory');

const getProduct = async (userId) => {
	try {
    let getProductList = await Product.find({ ownerId: userId});
		return getProductList;
	}
	catch (e) {
		return TE(res, 'Get locationCategories failed', 503);
	}		
};
module.exports.getProduct = getProduct;
const createProduct = async (product) => {
  [error, product] = await to(Product.create(product));
  if (err) TE(err);
}
module.exports.createProduct= createProduct;

const getProductParentCategories = async (ownerId) => {
	try {
    let getProductCategoryList = await ProductParentCategory.find({ deletionFlag: false, ownerId: ownerId});
		return getProductCategoryList;
	}
	catch (e) {
		return TE(res, 'Get productParentCategories failed', 503);
	}		
};
module.exports.getProductParentCategories = getProductParentCategories;

const createProductParentCategory = async (productParentCategoryDetail) => {
	let productParentCategory, err;
	[err, productParentCategory] = await to(ProductParentCategory.create(productParentCategoryDetail));		
};
module.exports.createProductParentCategory = createProductParentCategory;

const editProductParentCategory = async (id, productParentCategoryDetail) => {
	let productParentCategory, err;
	[err, productParentCategory] = await to(ProductParentCategory.update({ _id: id },productParentCategoryDetail));		
};
module.exports.editProductParentCategory = editProductParentCategory;