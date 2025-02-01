const express = require("express");
const UserController = require("../controllers/UserController");
const ProductController = require("../controllers/ProductController.js");
const UserAddressController = require("../controllers/UserAddressController");
const ProductCategoryController = require("../controllers/ProductCategory");
const ProductTypeController = require("../controllers/ProductTypeController");
const ProductTypeItemController = require("../controllers/ProductTypeItemsController.js");
const UserBusinessController = require("../controllers/UserBusinessController.js");
const UserBusinessChargeController = require("../controllers/UserBusinessCharge");
const UserExecitiveController = require("../controllers/UserExicitiveController.js");
const UserDeviceTokenController = require("../controllers/UserDeviceTokenController.js");
const AltrStateDistrictController = require("../controllers/AltStateDistrictController.js");
const AdminSettingController = require("../controllers/AltAdminSettingController.js");
const GeneralPageController = require("../controllers/AltGeneralPageController.js");
const AdminOfferController = require("../controllers/AltAdminOfferController.js");
const FaqController = require("../controllers/FaqsController.js");
const ProductMealController = require("../controllers/ProductMealPlanController.js");
const ProductTypeTimeoutController = require("../controllers/ProductTypesTimeOutController.js");
const UserBusinessOfferController = require("../controllers/UserBusinessOfferController.js");
const UserBusinessSettingController = require("../controllers/UserBusinessSettingController.js");
const UserExicitiveNotificationController = require("../controllers/UserExicitiveNotificationController.js");
const UserExicitiveLogController = require("../controllers/UserExicitiveslogsController.js");
const UserExicitiveDeviceTokenController = require("../controllers/UserExicitveDeviceTokenController.js");
const UserFavouritiesController = require("../controllers/UserFavourititeController.js");
const UserLogController = require("../controllers/UserLogsController.js");
const UserNotificationController = require("../controllers/UserNotificationController.js");
const UserQuerryResponseController = require("../controllers/UserQuerryResponseController.js");
const UserQuerryResponseAttachmentController = require("../controllers/UserQuerryResponseAttachmentsController.js");
const UserReferallController = require("../controllers/UserReferallsController.js");
const UserReviewAndRatingController = require("../controllers/UserReviewAndRatingController.js");
const UserSubScriptionController = require("../controllers/UserSubScriptionController.js")
const UserWalletController = require("../controllers/UserWalletController.js");
const UserWalletHistoryTransationController = require("../controllers/UserWalletHIstroyTransationsController.js");
const UserVerifyOtpHistoryController = require("../controllers/VerifyOtpController.js")
const uploadStorage = require("../fileupload.js");
const UserSubscriptionDeliveryScheduleController = require("../controllers/UserSubscritionScheduleController.js");
const { VerifyToken } = require("../middlewares/TokenCheacking");
const router = express.Router();

// User Routes

router.post("/user", VerifyToken, UserController.UpdateData);

router.get("/user", VerifyToken, UserController.getData);

// // product apis

router.post("/product", VerifyToken, ProductController.UpdateData);

router.get("/product", VerifyToken, VerifyToken, ProductController.getData);

// // user address apis

router.post("/user_address", VerifyToken, UserAddressController.UpdateData);

router.get("/user_address", VerifyToken, UserAddressController.getData);

// // product Categories apis

router.post("/product_category", ProductCategoryController.UpdateData);

router.get("/product_category", ProductCategoryController.getData);

// // productTypes apis

router.post("/product_type", ProductTypeController.UpdateData);

router.get("/product_type", ProductTypeController.getData);

// // productTypesitems apis

router.post(
  "/product_type_item",
  VerifyToken,
  ProductTypeItemController.UpdateData
);

router.get(
  "/product_type_item",
  VerifyToken,
  ProductTypeItemController.getData
);

// // user business apis

router.post("/user_business", VerifyToken, UserBusinessController.UpdateData);

router.get("/user_business", VerifyToken, UserBusinessController.getData);

// // user business charge

router.post(
  "/business_charge",
  VerifyToken,
  UserBusinessChargeController.UpdateData
);

router.get(
  "/business_charge",
  VerifyToken,
  UserBusinessChargeController.getData
);

// // user business Setting Need Testing

router.post("/business_setting", UserBusinessSettingController.UpdateData);

router.get("/business_setting", UserBusinessSettingController.getData);

// user business Offers

router.post("/business_offer", UserBusinessOfferController.UpdateData);

router.get("/business_offer", UserBusinessOfferController.getData);

// // user exicitivies

router.post("/user_exicitive", VerifyToken, UserExecitiveController.UpdateData);

router.get("/user_exicitive", VerifyToken, UserExecitiveController.getData);

// // user exicitivies Logs

router.post(
  "/user_exicitive_log",
  VerifyToken,
  UserExicitiveLogController.UpdateData
);

router.get(
  "/user_exicitive_log",
  VerifyToken,
  UserExicitiveLogController.getData
);

// // user favourities

router.post(
  "/user_favourites",
  VerifyToken,
  UserFavouritiesController.UpdateData
);

router.get("/user_favourites", VerifyToken, UserFavouritiesController.getData);

// // user Device token

router.post(
  "/user_device_token",
  VerifyToken,
  UserDeviceTokenController.UpdateData
);

router.get(
  "/user_device_token",
  VerifyToken,
  UserDeviceTokenController.getData
);

// // user exictive Device token

router.post(
  "/user_exicitive_device_token",
  VerifyToken,
  UserExicitiveDeviceTokenController.UpdateData
);

router.get(
  "/user_exicitive_device_token",
  VerifyToken,
  UserExicitiveDeviceTokenController.getData
);

// // user  logs

router.post("/user_log", VerifyToken, UserLogController.UpdateData);

router.get("/user_log", VerifyToken, UserLogController.getData);

// user Notification

router.post(
  "/user_notification",
  VerifyToken,
  UserNotificationController.UpdateData
);

router.get(
  "/user_notification",
  VerifyToken,
  UserNotificationController.getData
);

// user Exicitive Notification

router.post(
  "/user_exicitive_notification",
  VerifyToken,
  UserExicitiveNotificationController.UpdateData
);

router.get(
  "/user_exicitive_notification",
  VerifyToken,
  UserExicitiveNotificationController.getData
);

// user Querry response

router.post(
  "/user_querry_response",
  VerifyToken,
  UserQuerryResponseController.UpdateData
);

router.get(
  "/user_querry_response",
  VerifyToken,
  UserQuerryResponseController.getData
);

// // user Querry response  Attachments

router.post(
  "/user_querry_response_attachment",
  VerifyToken,
  UserQuerryResponseAttachmentController.UpdateData
);

router.get(
  "/user_querry_response_attachment",
  VerifyToken,
  UserQuerryResponseAttachmentController.getData
);

// // CreateAltrStateDistrict

router.post(
  "/state_district",
  VerifyToken,
  AltrStateDistrictController.UpdateData
);

router.get("/state_district", VerifyToken, AltrStateDistrictController.getData);

// // create Alt_admine_setting

router.post(
  "/admine_setting",
  VerifyToken,
  AdminSettingController.updateData
);
router.get("/admine_setting", VerifyToken, AdminSettingController.getData);

// // create Alt_GeneralPage

router.post("/general_page", VerifyToken, GeneralPageController.UpdateData);

router.get("/general_page", VerifyToken, GeneralPageController.getData);

// admin offer

router.get("/admin_offer", VerifyToken, AdminOfferController.getData);
router.post(
  "/admin_offer_update",
  VerifyToken,
  AdminOfferController.UpdateData
);

// Faqs

router.post("/faq", VerifyToken, FaqController.UpdateData);
router.get("/faq", VerifyToken, FaqController.getData);

// // Product meal Plan

router.post(
  "/product_meal_plan",
  VerifyToken,
  ProductMealController.UpdateData
);

router.get("/product_meal_plan", VerifyToken, ProductMealController.getData);

// // Product Type TimeOut

router.post(
  "/product_type_time_out",
  VerifyToken,
  ProductTypeTimeoutController.UpdateData
);

router.get(
  "/product_type_time_out",
  VerifyToken,
  ProductTypeTimeoutController.getData
);

// // User Referals

router.post("/user_referal", VerifyToken, UserReferallController.UpdateData);

router.get("/user_referal", VerifyToken, UserReferallController.getData);

// // User Ratings And Reviews

router.post(
  "/user_review_rating",
  VerifyToken,
  UserReviewAndRatingController.UpdateData
);

router.get(
  "/user_review_rating",
  VerifyToken,
  UserReviewAndRatingController.getData
);

// user address

router.post("/user_address", VerifyToken, UserAddressController.UpdateData);

router.get("/user_address", VerifyToken, UserAddressController.getData);

// // user SubScription

router.post("/user_subscription", UserSubScriptionController.UpdateData);

router.get("/user_subscription", UserSubScriptionController.getData);

// // Orders

// // router.post("/CreateOrders", verifyjwt, CreateOrder);

// // router.get("/GetAllorders", GetAllOrders);

// // router.delete("/DeleteOrder/:id", DeleteOrder);

// user SubScription Delivery Schedulle Need Testing

router.post(
  "/user_subscription_schedule",
  VerifyToken,
  UserSubscriptionDeliveryScheduleController.UpdateData
);

router.get(
  "/user_subscription_schedule",
  VerifyToken,
  UserSubscriptionDeliveryScheduleController.getData
);

// // user Wallet

router.post("/user_wallet", VerifyToken, UserWalletController.UpdateData);

router.get("/user_wallet", VerifyToken, UserWalletController.getData);

// //  userTransationHistory

router.post(
  "/user_wallet_transation_history",
  VerifyToken,
  UserWalletHistoryTransationController.UpdateData
);

router.get(
  "/user_wallet_transation_history",
  VerifyToken,
  UserWalletHistoryTransationController.getData
);

// // Verify otp

router.post(
  "/verfiy_otp",
  VerifyToken,
  UserVerifyOtpHistoryController.UpdateData
);

router.get("/verfiy_otp", VerifyToken, UserVerifyOtpHistoryController.getData);

// // user business offer

router.post("/userBusinessSettingcreate", UserBusinessController.UpdateData);

router.get("/userBusinessSettingcreate", UserBusinessController.getData);

module.exports = { router };
