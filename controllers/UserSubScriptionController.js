const {UserSubscription}=require("../models/")

const baseApiController=require("./../middlewares/BaseApiController") 
const {
  checkIsset,
  GET_LIST,
  GET_OBJECT,
  checkIsNumber,
  checkIsObject,
  ACTION_GET,
  ACTION_INSERTED,
  ACTION_UPDATED
} = require("../config/constant");

const { errorResponse, successResponse } = require("../utils/response");

const {
  sendData,
  requestSuccess,
  requestError,
  requestParam
} = require("../middlewares/BaseApiController");

exports.UpdateData = async (req, res) => {
  try {
    let params = baseApiController.removeNameValuePairs({ ...req.params, ...req.body, ...req.query });

    if (!checkIsObject(params)) {
      return requestError(res, params?.device_type, "params can not be null");
    } else if (checkIsset(params.id)) {
      if (!params.id) {
        return errorResponse(res, "id required ", null);
      } else if (!(tempData = await UserSubscription.getByKey(GET_OBJECT, {id: params.id}))) {
        return errorResponse(res, "Invalid ID", null);
      } else if (!params.values) {
        return errorResponse(res, "values required ", null);
      } else if (!checkIsObject(params.values)) {
        return errorResponse(res, "values must be object of updating values ", null);
      } else {
        const dataset=await UserSubscription.filterValidAttributes(params.values);
       
        const updateddata = await UserSubscription.updateData(dataset, params.id);
        return sendData(res,updateddata, "UserSubscription", ACTION_UPDATED,null,params?.device_type);
      }
    } else{
        const dataset=await UserSubscription.filterValidAttributes(params);
        // dataset.url_image="";

      const Data = await UserSubscription.insertData(dataset);
      return sendData(res,Data, "UserSubscription", ACTION_INSERTED,null,params?.device_type);
    }
  } catch (error) {
    console.log(error);
    return errorResponse(res, "error occour in updating the data");
  }
};

exports.getData = async (req, res) => {
    let params = baseApiController.removeNameValuePairs( { ...req.params, ...req.body, ...req.query });
    let tempData;
    try {
      if (checkIsset(params.user_subscription_id)) {
        if (!params.user_subscription_id) {
          return errorResponse(res, "user_subscription_id required ", null);
        } else if (
          !(tempData = await UserSubscription.getByKey(GET_OBJECT, {
            id: params.user_subscription_id
          }))
        ) {
          return errorResponse(res, "Invalid user_subscription_id", null);
        } else {
          const data = await UserSubscription.getFullById(tempData?.id);
          return sendData(res,data, "UserSubscription",ACTION_GET ,null,params?.device_type);
        }
      } else if (checkIsset(params.token_user_subscription)) {
        if (!params.token_user_subscription) {
          return errorResponse(res, "token_ required ", null);
        } else if (
          !(tempData = await UserSubscription.getByKey(GET_OBJECT, {
            token: params.token_user_subscription
          }))
        ) {
          return errorResponse(res, "Invalid token_user_subscription", null);
        } else {
          const data = await UserSubscription.getFullById(tempData.id);
          return successResponse(res, "fetched", data);
        }
      } else if (checkIsset(params.slug_UserSubscription)) {
        if (!params.slug_UserSubscription) {
          return errorResponse(res, "slug required ", null);
        } else if (
          !(tempData = await UserSubscription.getByKey(GET_OBJECT, {
            slug: params.slug_UserSubscription
          }))
        ) {
          return errorResponse(res, "Invalid slug", null);
        } else {
          const data = await UserSubscription.getFullById(tempData.id);
          return successResponse(res, "UserSubscription get", data);
        }
      } else if (!checkIsset(params.limit) || !checkIsNumber(params.limit)) {
        return errorResponse(res, "limit required ", null);
      } else if (!checkIsset(params.offset) || !checkIsNumber(params.offset)) {
        return errorResponse(res, "offset required ", null);
      } else {
        const data = await UserSubscription.getByKey(
          GET_LIST,
          null,
          null,
          null,
          params.limit,
          params.offset
        );
        return requestSuccess(res, "UserSubscription  fetched successfully", data);
      }
    } catch (error) {
      console.log(error);
      return errorResponse(
        res,
        "error in fetching  UserSubscription ",
        null
      );
    }
  };
