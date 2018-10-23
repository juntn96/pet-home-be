const authService = require('./../services/AuthService');

const register = async function (req, res) {
	res.setHeader('Content-Type', 'application/json');
		try {
			let image = 'https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png';
				let erro, user;
				[erro, user] = await to(authService.createUser(req.body, image));
				if (erro) return ReE(res, erro, 422);
				return ReS(res, {
					message: 'Successfully created new user.',
					user: user.toWeb(),
					token: user.getJWT(),
				}, 200);			
		} catch (error) {
			return ReE(res, 'Đăng ký không thành công, vui lòng thử lại sau', 400);
    }
};
module.exports.register = register;

const login = async function (req, res) {
	let err, user;
	[err, user] = await to(authService.authUser(req.body));
	if (err) return ReE(res, err, 422);
	res.cookie('ACCESS_TOKEN', user.getJWT(), { maxAge: 900000 });
	return ReS(res, {
		token: user.getJWT(),
		user: user.toWeb(),
	});
};
module.exports.login = login;

const logout = function (req, res) {
	res.clearCookie('ACCESS_TOKEN');
	req.logout();
	res.redirect('/');
};
module.exports.logout = logout;
