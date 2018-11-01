const productService = require('../services/ProductService')
// const validateProductInput = require('..')

// get all product
const getProduct = async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  // const { errors, isValid } = validateProductInput(req.body);
  // Check Validation
  // if (!isValid) {
  //   return ReE(res, errors , 400)
  // }
  let error, product;
  [error, product] = await to(productService.getProduct(req.params.uid));
  if (error) {
    return ReE(res, 'Get product failed', 422);
  }
  if (product) {
    return ReS(res, { message: 'Get product success', product: product }, 200);
  }
  else {
    return ReE(res, 'Get product failed', 503);
  }
}
module.exports.getProduct = getProduct;
const addProduct = async (req, res)=> {
  res.setHeader('Content-Type', 'application/json');
  // const { errors, isValid } = validateProductInput(req.body);
  // Check Validation
  // if (!isValid) {
  //   return ReE(res, errors , 400)
  // }
  let error, product;
  [error, product] = await to(productService.createProduct(req.body));
  console.log(req.body);
  if (error) return ReE(res, 'Không thể tạo thêm sản phẩm', 422);
  return ReS(res, {
    message: 'Create new product successfully'
  }, 200);
}

module.exports.addProduct = addProduct;

const getProductCategories = async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  let erro, productCategories;
  [erro, productCategories] = await to(productService.getproductCategories(req.body));
  if (erro) {
    return ReE(res, 'Get productCategories failed', 422);
  }	
  if (productCategories) {
    return ReS(res, { message: 'Get productCategories success', productCategories: productCategories }, 200);
  }
  else {
    return ReE(res, 'Get productCategories failed', 503);
  }
  				
};
module.exports.getProductCategories = getProductCategories;