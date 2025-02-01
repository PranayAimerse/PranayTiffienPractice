"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const User = require("./User");
const Product = require("./Product");
const AlterAdminSetting = require("./AlterAdminSetting");
const AlterAdminOffer = require("./AlterAdminOffer");
const AlterGeneralPage = require("./AlterGeneralPage");
const AlterStateDistrict = require("./AlterStateDistrict");

const OrderProductType = require('./OrderProductType');
const Faq = require("./Faq");
const ProductCategory = require("./ProductCategory");
const ProductMealPlan = require("./ProductMealPlan");
const ProductTypeItems = require("./ProductTypeItems");
const ProductType = require("./ProductTypes");
const ProductTypeTimeout = require("./ProductTypeTimeout");
const Useraddress = require("./UserAddress");

const UserBusinessCharge = require("./UserBusinessCharge");
const UserBusinessSetting = require("./UserBusinessSetting");
const UserBusinessOffer = require("./UserBusinessOffer");
const UserExecutiveDeviceToken = require("./UserExecutiveDeviceToken");
const UserDeviceToken = require("./UserDeviceToken");
const UserExecutive = require("./UserExecutive");
const UserBusiness = require("./UserBusiness");
const UserExecutiveLog = require("./UserExecutiveLog");
const UserExecutiveNotification = require("./UserExecutiveNotification");
const Userfavourites = require("./Userfavourites");
const UserLog = require("./UserLog");
const UserNotification = require("./UserNotification");
const UserQuerryResponseAttachment = require("./UserQueryResponseAttachment");
const UserQueryResponse = require("./UserQueryResponse");
const UserReferral = require("./UserReferral");
const UserReviewAndRating = require("./UserReviewAndRating");
const UserSubscription = require("./UserSubscription");
const UserSubscriptionDeliverySchedule = require("./UserSubscriptionDeliverySchedule");
const UserWallet = require("./UserWallet");
const UserWalletHistory = require("./UserWalletHistory");
const VerifyOtpHistory = require("./VerifyOtpHistory");
const db = {
  User,
  UserWalletHistory,
  VerifyOtpHistory,
  UserExecutiveNotification,
  Userfavourites,
  UserLog,
  UserNotification,
  UserQuerryResponseAttachment,
  UserQueryResponse,
  UserReferral,
  UserReviewAndRating,
  UserSubscription,
  UserSubscriptionDeliverySchedule,
  UserWallet,
  Product,
  AlterAdminSetting,
  UserDeviceToken,
  UserBusinessCharge,
  UserBusinessSetting,
  UserBusinessOffer,
  UserExecutiveDeviceToken,

  UserExecutive,
  UserBusiness,
  UserExecutiveLog,
  AlterAdminOffer,
  AlterGeneralPage,
  AlterStateDistrict,
  OrderProductType,

  Faq,
  ProductCategory,
  ProductMealPlan,
  ProductTypeItems,
  ProductType,
  ProductTypeTimeout,
  Useraddress
};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
  console.log("db connected");
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
  console.log("db connected");
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// fs.readdirSync(__dirname)
//   .filter((file) => {
//     return (
//       file.indexOf(".") !== 0 &&
//       file !== basename &&
//       file.slice(-3) === ".js" &&
//       file.indexOf(".test.js") === -1
//     );
//   })
//   // .forEach((file) => {
//   //   const model = require(path.join(__dirname, file))(
//   //     sequelize,
//   //     Sequelize.DataTypes
//   //   );
//   //   db[model.name] = model;
//   // });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
