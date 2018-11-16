const AppUserService = require("../services/AppUserService");

const createUser = async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  try {
    const facebookId = req.body.facebookId;
    const appName = req.body.appName;
    const avatar = req.body.avatar;
    const role = req.body.role;
    const data = {
      facebookId,
      appName,
      avatar,
      role,
    };
    const result = await AppUserService.createUser(data);
    return ReS(res, { result }, 200);
  } catch (error) {
    return ReE(res, error, 422);
  }
};

const findUser = async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  try {
    return ReS(res, { result }, 200);
  } catch (error) {
    return ReE(res, error, 422);
  }
};

module.exports = {
  createUser,
};
