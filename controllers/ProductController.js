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
  [error, product] = await to(productService.getProduct());
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
  let error, proudct;
  [error, proudct] = await to(productService.createProduct(req.body));
  if (error) return ReE(res, 'Không thể tạo thêm sản phẩm', 422);
  return ReS(res, {
    message: 'Create new product successfully'
  }, 200);
}

module.exports.addProduct = addProduct;