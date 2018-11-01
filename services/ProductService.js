const {Product} = require('./../models/Product');
const {ProductCategory} = require('./../models/ProductCategory');
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

const getProductCategories = async (userId) => {
	try {
    let getProductCategoryList = await ProductCategory.find({ deletionFlag: false});
		return getProductCategoryList;
	}
	catch (e) {
		return TE(res, 'Get locationCategories failed', 503);
	}		
};
module.exports.getProductCategories = getProductCategories;

const createProductParentCategory = async (productParentCategoryDetail) => {
	let productParentCategory, err;
	[err, productParentCategory] = await to(ProductParentCategory.create(productParentCategoryDetail));		
};
module.exports.createProductParentCategory = createProductParentCategory;