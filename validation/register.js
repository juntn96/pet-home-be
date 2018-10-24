const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';
  data.location.name = isEmpty(data.location.name) ? data.location.name : '';
  data.location.address = isEmpty(data.location.address) ? data.location.address : '';

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Bạn chưa nhập mật khẩu';
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Mật khẩu ít nhất 6 kí tự và nhiều nhất 30 kí tự.';
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = 'Bận chưa nhập mật khẩu lần 2';
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = 'Mật khẩu không trùng khớp';
  }

  if (Validator.isEmpty(data.location.name)) {
    errors.password = 'Bạn chưa nhập tên cửa hàng';
  }

  if (Validator.isEmpty(data.location.name)) {
    errors.password = 'Bạn chưa nhập địa chỉ cửa hàng';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
