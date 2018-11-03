const adminService = require('./../services/AdminService');

const addLocationCategory = async function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  let erro, locationCategory;
  [erro, locationCategory] = await to(adminService.createLocationCategory(req.body));
  if (erro) {
    return ReE(res, 'Thêm mới LC không thành công, vui lòng thử lại sau', 422);
  }
  return ReS(res, {
    message: 'Successfully created new LC.',
  }, 200);				
};

module.exports.addLocationCategory = addLocationCategory;