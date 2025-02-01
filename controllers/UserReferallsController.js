const {UserReferral}=require("../models")

const baseApiController=require("../middlewares/BaseApiController") 
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
      } else if (!(tempData = await UserReferral.getByKey(GET_OBJECT, {id: params.id}))) {
        return errorResponse(res, "Invalid ID", null);
      } else if (!params.values) {
        return errorResponse(res, "values required ", null);
      } else if (!checkIsObject(params.values)) {
        return errorResponse(res, "values must be object of updating values ", null);
      } else {
        const dataset=await UserReferral.filterValidAttributes(params.values);
       
        const updateddata = await UserReferral.updateData(dataset, params.id);
        return sendData(res,updateddata, "UserReferral", ACTION_UPDATED,null,params?.device_type);
      }
    } else if (!params?.status) {
      return errorResponse(res, "title required ", null);
    } else{
        const dataset=await UserReferral.filterValidAttributes(params);
        // dataset.url_image="";

      const Data = await UserReferral.insertData(dataset);
      return sendData(res,Data, "UserReferral", ACTION_INSERTED,null,params?.device_type);
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
    if (checkIsset(params.user_referal_id)) {
      if (!params.user_referal_id) {
        return errorResponse(res, "user_referal_id required ", null);
      } else if (
        !(tempData = await UserReferral.getByKey(GET_OBJECT, {
          id: params.user_referal_id
        }))
      ) {
        return errorResponse(res, "Invalid user_referal_id", null);
      } else {
        const data = await UserReferral.getFullById(tempData?.id);
        return sendData(res,data, "UserReferral",ACTION_GET ,null,params?.device_type);
      }
    } else if (checkIsset(params.token_user_referral)) {
      if (!params.token_user_referral) {
        return errorResponse(res, "token_ required ", null);
      } else if (
        !(tempData = await UserReferral.getByKey(GET_OBJECT, {
          token: params.token_user_referral
        }))
      ) {
        return errorResponse(res, "Invalid token_user_referral", null);
      } else {
        const data = await UserReferral.getFullById(tempData.id);
        return successResponse(res, "fetched", data);
      }
    } else if (checkIsset(params.slug_UserReferral)) {
      if (!params.slug_UserReferral) {
        return errorResponse(res, "slug required ", null);
      } else if (
        !(tempData = await UserReferral.getByKey(GET_OBJECT, {
          slug: params.slug_UserReferral
        }))
      ) {
        return errorResponse(res, "Invalid slug", null);
      } else {
        const data = await UserReferral.getFullById(tempData.id);
        return successResponse(res, "UserReferral get", data);
      }
    } else if (!checkIsset(params.limit) || !checkIsNumber(params.limit)) {
      return errorResponse(res, "limit required ", null);
    } else if (!checkIsset(params.offset) || !checkIsNumber(params.offset)) {
      return errorResponse(res, "offset required ", null);
    } else {
      const data = await UserReferral.getByKey(
        GET_LIST,
        null,
        null,
        null,
        params.limit,
        params.offset
      );
      return requestSuccess(res, "UserReferral  fetched successfully", data);
    }
  } catch (error) {
    console.log(error);
    return errorResponse(
      res,
      "error in fetching  UserReferral ",
      null
    );
  }
};


exports.DeleteUserReferals = async (req, res) => {
  try {
    let params = { ...req.params, ...req.body, ...req.query };
    console.log("id is comming or not", params.id);
    if (checkIsset(params.id)) {
      if (!params.id) {
        return errorResponse(res, "_id required ", null);
      }
    }
    const data = await UserReferral.deleteData(params.id);
    return successResponse(res, " successfully deleted", data);
  } catch (err) {
    console.log(err);
    return errorResponse(res, "erro in userReferals ", err);
  }
};
