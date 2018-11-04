const productService = require('../services/ProductService')

// get all product
const getProduct = async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
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
  const image = 'http://cdn.nhanh.vn/cdn/store/23446/ps/20180110/102341625_3c0a747d19943b04ca2dcbd956332bfc_724x724.jpg';
  let error, product;
  [error, product] = await to(productService.createProduct(req.body, image));
  if (error) return ReE(res, 'Không thể tạo thêm sản phẩm', 422);
  return ReS(res, {
    message: 'Create new product successfully'
  }, 200);
}

module.exports.addProduct = addProduct;

const getProductParentCategories = async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  const ownerId = req.params.ownerId;
  let erro, productParentCategories;
  [erro, productParentCategories] = await to(productService.getProductParentCategories(ownerId));
  if (erro) {
    return ReE(res, 'Get productParentCategories failed', 422);
  }	
  if (productParentCategories) {
    return ReS(res, { message: 'Get productParentCategories success', productParentCategories: productParentCategories }, 200);
  }
  else {
    return ReE(res, 'Get productParentCategories failed', 503);
  }
  				
};
module.exports.getProductParentCategories = getProductParentCategories;

const getProductByIds = async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  const ownerId = req.params.ownerId;
  let erro, productByIds;
  [erro, productByIds] = await to(productService.getProductByIds(ownerId));
  if (erro) {
    return ReE(res, 'Get productByIds failed', 422);
  }	
  if (productByIds) {
    return ReS(res, { message: 'Get productByIds success', productByIds: productByIds }, 200);
  }
  else {
    return ReE(res, 'Get productByIds failed', 503);
  }
  				
};
module.exports.getProductByIds = getProductByIds;


const addProductParentCategory = async function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  let erro, addProductParentCategory;
  [erro, addProductParentCategory] = await to(productService.createProductParentCategory(req.body));
  if (erro) {
    return ReE(res, 'Thêm mới PPC không thành công, vui lòng thử lại sau', 422);
  }
  return ReS(res, {
    message: 'Successfully created new PPC.',
  }, 200);				
};


module.exports.addProductParentCategory = addProductParentCategory;

const editProductParentCategory = async function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  let erro, editProductParentCategory;
  [erro, editProductParentCategory] = await to(productService.editProductParentCategory(req.body.id,req.body));
  if (erro) {
    return ReE(res, 'Thêm mới PPC không thành công, vui lòng thử lại sau', 422);
  }
  return ReS(res, {
    message: 'Successfully created new PPC.',
  }, 200);				
};

module.exports.editProductParentCategory = editProductParentCategory;
