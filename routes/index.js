const express = require("express");
const router = express.Router();

const AuthController = require("./../controllers/AuthController");
const PhoneController = require("./../controllers/PhoneController");
const AdminController = require("./../controllers/AdminController");
const LocationController = require("./../controllers/LocationController");
const UserController = require("./../controllers/UserController");
const ProductController = require("../controllers/ProductController");
const UploadController = require("./../controllers/UploadController.js");

//#region post
const PostCategoryController = require("../controllers/PostCategoryController");
const PostController = require("../controllers/PostController");
//#endregion

const passport = require("passport");
const path = require("path");

require("./../middleware/passport")(passport);

//Auth controller
router.post("/auth/register", AuthController.register);
router.post("/auth/login", AuthController.login);
router.post("/auth/logout", AuthController.logout);

//Admin
router.post("/admin/addLocationCategory", AdminController.addLocationCategory);

//User
router.get("/users/forgotPassword/:phoneNumber", UserController.forgotPassword);
// router.get('/users/detail/:userId', passport.authenticate('jwt', {
// 	session: false,
// }), UserController.getUserById);
router.get("/users/detail/:userId", UserController.getUserById);

//Location Category
router.get(
  "/location/locationCategories",
  LocationController.getLocationCategories
);

//Product
router.post(
  "/product/add",
  passport.authenticate("jwt", {
    session: false,
  }),
  ProductController.addProduct
);
router.get(
  "/product/productByUserIds/:ownerId",
  passport.authenticate("jwt", {
    session: false,
  }),
  ProductController.getProductByIds
);

//User
router.get('/users/forgotPassword/:phoneNumber', UserController.forgotPassword);
router.get('/users/detail/:userId', UserController.getUserById);

//Location Category
router.get('/location/locationCategories/:type', LocationController.getLocationCategories);

//Create Admin
router.post('/admin/create', AuthController.createAdminUser);
router.get('/admin/wake-up', passport.authenticate('jwt', {
  session: false,
}),(req, res) => res.send('👌'));
router.post('./admin/addLocation',passport.authenticate('jwt', {
  session: false,
}), AdminController.addLocation)


//Product
router.post('/product/add', 
  passport.authenticate('jwt', {
    session: false,
  }),
  ProductController.addProduct);

router.get('/product/productByUserIds/:ownerId', 
  passport.authenticate('jwt', {
    session: false,
  }),
  ProductController.getProductByIds);

// get product category
router.get('/product/productParentCategories/:ownerId',
  passport.authenticate('jwt', {
    session: false,
  }), 
  ProductController.getProductParentCategories);
router.post('/product/addProductParentCategory', 
  passport.authenticate('jwt', {
    session: false,
  }),
  ProductController.addProductParentCategory);

//Location
router.get('/location/profile/:id', 
  passport.authenticate('jwt', {
    session: false,
  }),
  LocationController.getLocationProfile);

//Product
router.put('/product/delete', 
  passport.authenticate('jwt', {
    session: false,
  }),
  ProductController.deleteProduct);
router.put('/product/update', 
  passport.authenticate('jwt', {
    session: false,
  }),ProductController.updateProduct);
router.get('/product/:id', 
  passport.authenticate('jwt', {
    session: false,
  }),
  ProductController.getProductDetailById);
router.put('/product/updateProductCategory', 
  passport.authenticate('jwt', {
    session: false,
  }),
  ProductController.updateProductParentCategory);


//Phone
router.post("/phone/sms", PhoneController.sendPhoneVerifyCode);
router.post("/phone/verify", PhoneController.verifyPhoneVerifyCode);

//#region post category route
router.get("/post/category/get", PostCategoryController.get);
router.post("/post/category/add", PostCategoryController.add);
router.delete("/post/category/deleteById", PostCategoryController.deleteById);
router.put(
  "/post/category/updateNameById",
  PostCategoryController.updateNameById
);
//#endregion

//#region post route
router.get("/post/get", PostController.get);
router.get("/post/search", PostController.postTextSearch);
router.get("/post/:ownerId", PostController.getByOwnerId);
router.get("/post/get/:typeId", PostController.getPublicByTypeId);
router.post("/post/add", PostController.add);
router.put("/post/edit", PostController.editPost);
router.delete("/post/deleteById", PostController.deleteById);
///////////
router.get("/post/images/:postId", PostController.getImages);
router.put("/post/images/add", PostController.addImages);
router.delete("/post/images/removeImage", PostController.removeImage);
////////////
router.get("/post/comment/:postId", PostController.getComments);
router.post("/post/comment/add", PostController.addComment);
router.put("/post/comment/edit", PostController.editComment);
router.delete("/post/comment/delete", PostController.deleteComment);
////////////
router.get("/post/vote/get", PostController.getVoteByType);
router.post("/post/vote", PostController.vote);
///////////////////////////////////
router.post("/post/report/add", PostController.addReport);
router.get("/post/report/:postId", PostController.getReports);
//#endregion

// Upload to Cloudinary
router.get("/wake-up", (req, res) => res.send("👌"));
router.post(
  "/image-upload",
  passport.authenticate("jwt", {
    session: false,
  }),
  UploadController.uploadImage
);

// Upload to Cloudinary
router.get('/wake-up', (req, res) => res.send('👌'))
router.post('/image-upload', UploadController.uploadImage);

module.exports = router;
