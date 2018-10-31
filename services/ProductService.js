const {Product} = require('../models/Product');

const getProduct = async () => {
	try {
    let getProductList = await Product.find({ hiddenFlag: false });
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