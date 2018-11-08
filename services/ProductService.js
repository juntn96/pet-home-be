const Product = require('./../models/Product');
const ProductParentCategory = require('./../models/ProductParentCategory');

const createProduct = async (productDetail, image) => {
  productDetail.images = [image];
  let productAdd = new Product({
    name: productDetail.name,
    ownerId: productDetail.ownerId,
    typeId: productDetail.typeId,
    description: productDetail.description,
    price: productDetail.price,
    images: productDetail.images
  });
  [error, product] = await to(Product.create(productAdd));
  if (error) TE(error);
}
module.exports.createProduct= createProduct;

const updateProduct = async (productDetail) => {
  [error, product] = await to(Product.create(productDetail));
  if (error) TE(error);
}
module.exports.updateProduct= updateProduct;


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

const getProductByIds = async (ownerId) => {
	try {
    let getProductByIdList = await Product.find({ deletionFlag: false, ownerId: ownerId});
		return getProductByIdList;
	}
	catch (e) {
		return TE(res, 'Get productByIds failed', 503);
	}		
};
module.exports.getProductByIds = getProductByIds;

const createProductParentCategory = async (productParentCategoryDetail) => {
	let productParentCategory, err;
	[err, productParentCategory] = await to(ProductParentCategory.create(productParentCategoryDetail));		
};
module.exports.createProductParentCategory = createProductParentCategory;

const updateProductParentCategory = async (productParentCategoryDetail) => {
	let productParentCategory, err;
	[err, productParentCategory] = await to(ProductParentCategory.update({ _id: productParentCategoryDetail._id },productParentCategoryDetail));		
};
module.exports.updateProductParentCategory = updateProductParentCategory;