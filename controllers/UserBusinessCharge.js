const {UserBusinessCharge}=require("../models/")

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
      } else if (!(tempData = await UserBusinessCharge.getByKey(GET_OBJECT, {id: params.id}))) {
        return errorResponse(res, "Invalid ID", null);
      } else if (!params.values) {
        return errorResponse(res, "values required ", null);
      } else if (!checkIsObject(params.values)) {
        return errorResponse(res, "values must be object of updating values ", null);
      } else {
        const dataset=await UserBusinessCharge.filterValidAttributes(params.values);
       
        const updateddata = await UserBusinessCharge.updateData(dataset, params.id);
        return sendData(res,updateddata, "UserBusinessCharge", ACTION_UPDATED,null,params?.device_type);
      }
    } else if (!params?.status) {
      return errorResponse(res, "title required ", null);
    } else{
        const dataset=await UserBusinessCharge.filterValidAttributes(params);
        // dataset.url_image="";

      const Data = await UserBusinessCharge.insertData(dataset);
      return sendData(res,Data, "UserBusinessCharge", ACTION_INSERTED,null,params?.device_type);
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
    if (checkIsset(params.user_business_charge_id)) {
      if (!params.user_business_charge_id) {
        return errorResponse(res, "user_business_charge_id required ", null);
      } else if (
        !(tempData = await UserBusinessCharge.getByKey(GET_OBJECT, {
          id: params.user_business_charge_id
        }))
      ) {
        return errorResponse(res, "Invalid user_business_charge_id", null);
      } else {
        const data = await UserBusinessCharge.getFullById(tempData?.id);
        return sendData(res,data, "UserBusinessCharge",ACTION_GET ,null,params?.device_type);
      }
    } else if (checkIsset(params.token_user_business_charge)) {
      if (!params.token_user_business_charge) {
        return errorResponse(res, "token_ required ", null);
      } else if (
        !(tempData = await UserBusinessCharge.getByKey(GET_OBJECT, {
          token: params.token_user_business_charge
        }))
      ) {
        return errorResponse(res, "Invalid token_user_business_charge", null);
      } else {
        const data = await UserBusinessCharge.getFullById(tempData.id);
        return successResponse(res, "fetched", data);
      }
    } else if (checkIsset(params.slug_UserBusinessCharge)) {
      if (!params.slug_UserBusinessCharge) {
        return errorResponse(res, "slug required ", null);
      } else if (
        !(tempData = await UserBusinessCharge.getByKey(GET_OBJECT, {
          slug: params.slug_UserBusinessCharge
        }))
      ) {
        return errorResponse(res, "Invalid slug", null);
      } else {
        const data = await UserBusinessCharge.getFullById(tempData.id);
        return successResponse(res, "UserBusinessCharge get", data);
      }
    } else if (!checkIsset(params.limit) || !checkIsNumber(params.limit)) {
      return errorResponse(res, "limit required ", null);
    } else if (!checkIsset(params.offset) || !checkIsNumber(params.offset)) {
      return errorResponse(res, "offset required ", null);
    } else {
      const data = await UserBusinessCharge.getByKey(
        GET_LIST,
        null,
        null,
        null,
        params.limit,
        params.offset
      );
      return requestSuccess(res, "UserBusinessCharge  fetched successfully", data);
    }
  } catch (error) {
    console.log(error);
    return errorResponse(
      res,
      "error in fetching  UserBusinessCharge ",
      null
    );
  }
};


exports.DeleteBusinessCharge = async (req, res) => {
  try {
    let params = { ...req.params, ...req.body, ...req.query };
    console.log("id is comming or not", params.id);
    if (checkIsset(params.id)) {
      if (!params.id) {
        return errorResponse(res, "_id required ", null);
      }
    }
    const data = await UserBusinessCharge.deleteData(params.id);
    return requestSuccess(res,"data successfully deleted",data)
  } catch (error) {
    console.log(error);
    return errorResponse(res, "error in gettitng all business charege", error);
  }
};
