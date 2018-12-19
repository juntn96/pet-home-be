const express = require("express");
const router = express.Router();

const AuthController = require("./../controllers/AuthController");
const PhoneController = require("./../controllers/PhoneController");
const AdminController = require("./../controllers/AdminController");
const LocationController = require("./../controllers/LocationController");
const UserController = require("./../controllers/UserController");
const ProductController = require("../controllers/ProductController");
const UploadController = require("./../controllers/UploadController.js");

//#region khanhln
const PostCategoryController = require("../controllers/PostCategoryController");
const PostController = require("../controllers/PostController");
const AppUserController = require("../controllers/AppUserController");
const ConversationController = require("../controllers/ConversationController");
const NotificationController = require("../controllers/NotificationController");
//#endregion

const LocationModel = require("./../models/Location");
//#region trunghp
const PetController = require("../controllers/PetController");
const ReportController = require("../controllers/ReportController");
//#endregion

const passport = require("passport");
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
  "/location/locationCategoriesByType/:type",
  LocationController.getLocationCategoriesByType
);

router.get(
  "/location/locationCategories",
  LocationController.getLocationCategories
);
router.post(
  "/admin/location/locationCategories",
  LocationController.addLocationCategory
);
router.put("/admin/location/locationCategories",LocationController.updateLocationCategories);


// Location admin
router.get("/admin/getLocation", LocationController.getAllLocations);

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
router.get("/users/forgotPassword/:phoneNumber", UserController.forgotPassword);
router.get("/users/detail/:userId", UserController.getUserById);

//Create Admin
router.post("/admin/create", AuthController.createAdminUser);
router.get(
  "/admin/wake-up",
  passport.authenticate("jwt", {
    session: false,
  }),
  (req, res) => res.send("👌")
);
router.post(
  "/admin/addLocation",
  passport.authenticate("jwt", {
    session: false,
  }),
  AdminController.addLocation
);

//User
router.get("/users/forgotPassword/:phoneNumber", UserController.forgotPassword);
router.get("/users/detail/:userId", UserController.getUserById);

//Create Admin
router.post("/admin/create", AuthController.createAdminUser);
router.get(
  "/admin/wake-up",
  passport.authenticate("jwt", {
    session: false,
  }),
  (req, res) => res.send("👌")
);
router.post(
  "./admin/addLocation",
  passport.authenticate("jwt", {
    session: false,
  }),
  AdminController.addLocation
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

// get product category
router.get(
  "/product/productParentCategories/:ownerId",
  passport.authenticate("jwt", {
    session: false,
  }),
  ProductController.getProductParentCategories
);
router.post(
  "/product/addProductParentCategory",
  passport.authenticate("jwt", {
    session: false,
  }),
  ProductController.addProductParentCategory
);

//Location
router.get(
  "/location/detail/:ownerId",
  passport.authenticate("jwt", {
    session: false,
  }),
  LocationController.getLocationProfile
);
router.put(
  "/location/update",
  passport.authenticate("jwt", {
    session: false,
  }),
  LocationController.updateLocation
);

router.get(
  "/location/searchNear/:long/:lat/:radius",
  LocationController.searchNearByLatLong
);
router.get(
  "/location/searchDist/:long/:lat/:radius",
  LocationController.searchDist
);
router.get(
  "/location/searchAllLocations",
  LocationController.searchAllLocations
);
router.get(
  "/location/locationProduct/:ownerId",
  LocationController.getLocationWithAllProduct
)
router.get(
  "/location/locationByCategory",
  LocationController.searchLocationByCategory
)

//Product
router.put(
  "/product/delete",
  passport.authenticate("jwt", {
    session: false,
  }),
  ProductController.deleteProduct
);
router.put(
  "/product/update",
  passport.authenticate("jwt", {
    session: false,
  }),
  ProductController.updateProduct
);
// router.get(
//   "/product/:id",
//   passport.authenticate("jwt", {
//     session: false,
//   }),
//   ProductController.getProductDetailById
// );

router.get(
  "/product/:id",
  ProductController.getProductDetailById
);
router.put(
  "/product/updateProductCategory",
  passport.authenticate("jwt", {
    session: false,
  }),
  ProductController.updateProductParentCategory
);

//Phone
router.post("/phone/sms", PhoneController.sendPhoneVerifyCode);
router.post("/phone/verify", PhoneController.verifyPhoneVerifyCode);

//#region post category route
router.get("/post/category/get", PostCategoryController.get);
router.post("/post/category/add", PostCategoryController.add);
router.delete("/post/category/deleteById", PostCategoryController.deleteById);
router.get("/post/category/:typeId", PostCategoryController.getByID);
router.put(
  "/post/category/updateNameById",
  PostCategoryController.updateNameById
);
//#endregion

//#region post route
router.get("/post/getById/:postId", PostController.getPostById);
router.get("/post/get", PostController.get);
router.get("/post/search", PostController.postTextSearch);
router.get("/post/:ownerId", PostController.getByOwnerId);
router.get("/post/getById/:postId", PostController.getById);
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
////
router.post("/post/testNotification", PostController.testNotification);
//#endregion
//#region app user service
router.post("/app/user/add", AppUserController.createUser);
router.post("/app/user/addExpoToken", AppUserController.addExpoToken);
router.post("/app/user/removeExpoToken", AppUserController.removeExpoToken);
router.post("/app/user/findByFbId", AppUserController.findUserByFbId);
router.get("/app/user/:userId", AppUserController.findUser);
router.post("/app/user/notification/add", AppUserController.addNotification);
router.get(
  "/app/user/notification/:userId",
  AppUserController.getNotifications
);
//#endregion

//#region conversation
router.get(
  "/conversation/:userId",
  ConversationController.getConversationsByUser
);
router.get(
  "/conversation/message/:conversationId",
  ConversationController.getMessagesInConversation
);
router.post("/conversation/add", ConversationController.createConversation);
router.post(
  "/conversation/match",
  ConversationController.findConversationByUsers
);
router.post("/conversation/message/add", ConversationController.addMessage);
//#endregion

//#region pet route
router.post("/pet/add", PetController.add);
router.get("/pet/get/:userId", PetController.getByUser);
router.get("/pet/getPet/:userId", PetController.getPet);
router.get("/pet/getById/:petId", PetController.getById);
router.delete("/pet/deletePet", PetController.deletePet);
router.post("/pet/editPet", PetController.editPet);
router.post("/pet/like", PetController.addUserLikePet);
router.get("/pet/isLiked", PetController.isLiked);
router.post("/pet/ignore", PetController.addUserIgnorePet);
router.get("/pet/getLikeNumber/:petId", PetController.getLikeNumber);
router.get("/pet/getNotIgnoredPet/:userId", PetController.getNotIgnoredPet);
router.post("/pet/changeRequestStatus", PetController.changeRequestStatus);
//#endregion

//#region report route
router.post("/report/addReport", ReportController.addReport);
router.put("/report/updateReportStatus", ReportController.updateReportStatus);
router.get("/report/getReportedPost", ReportController.adminGetAllReports);
router.get("/report/:postId", ReportController.getReportByPostId);
//#endregion

//#region notification
router.post("/app/notification/add", NotificationController.addNotification);
router.post("/app/notification/hide", NotificationController.hiddenNotification);
router.get(
  "/app/notification/:userId",
  NotificationController.getNotifications
);
router.get(
  "/app/notification/getType/:userId/:type",
  NotificationController.getNotificationsByType
);
//#endregion

// Upload to Cloudinary
router.get("/wake-up", (req, res) => res.send("👌"));
router.post("/image-upload", UploadController.uploadImage);

//get all user: ADMIN
router.get("/admin/users", UserController.getAllUsers);
router.put("/admin/users", UserController.banUserById);
// get
router.get("/admin/users/status/:id", UserController.getStatusUserById);

module.exports = router;
