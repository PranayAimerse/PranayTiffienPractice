const {User}=require("../models/")

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
      } else if (!(tempData = await User.getByKey(GET_OBJECT, {id: params.id}))) {
        return errorResponse(res, "Invalid ID", null);
      } else if (!params.values) {
        return errorResponse(res, "values required ", null);
      } else if (!checkIsObject(params.values)) {
        return errorResponse(res, "values must be object of updating values ", null);
      } else {
        const dataset=await User.filterValidAttributes(params.values);
       
        const updateddata = await User.updateData(dataset, params.id);
        return sendData(res,updateddata, "User", ACTION_UPDATED,null,params?.device_type);
      }
    }  else{
        const dataset=await User.filterValidAttributes(params);
        // dataset.url_image="";

      const Data = await User.insertData(dataset);
      return sendData(res,Data, "User", ACTION_INSERTED,null,params?.device_type);
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
    if (checkIsset(params.user_id)) {
      if (!params.user_id) {
        return errorResponse(res, "user_id required ", null);
      } else if (
        !(tempData = await User.getByKey(GET_OBJECT, {
          id: params.user_id
        }))
      ) {
        return errorResponse(res, "Invalid user_id", null);
      } else {
        const data = await User.getFullById(tempData?.id);
        return sendData(res,data, "User",ACTION_GET ,null,params?.device_type);
      }
    } else if (checkIsset(params.token_user)) {
      if (!params.token_user) {
        return errorResponse(res, "token_ required ", null);
      } else if (
        !(tempData = await User.getByKey(GET_OBJECT, {
          token: params.token_user
        }))
      ) {
        return errorResponse(res, "Invalid token_user", null);
      } else {
        const data = await User.getFullById(tempData.id);
        return successResponse(res, "fetched", data);
      }
    } else if (checkIsset(params.slug_User)) {
      if (!params.slug_User) {
        return errorResponse(res, "slug required ", null);
      } else if (
        !(tempData = await User.getByKey(GET_OBJECT, {
          slug: params.slug_User
        }))
      ) {
        return errorResponse(res, "Invalid slug", null);
      } else {
        const data = await User.getFullById(tempData.id);
        return successResponse(res, "User get", data);
      }
    } else if (!checkIsset(params.limit) || !checkIsNumber(params.limit)) {
      return errorResponse(res, "limit required ", null);
    } else if (!checkIsset(params.offset) || !checkIsNumber(params.offset)) {
      return errorResponse(res, "offset required ", null);
    } else {
      const data = await User.getByKey(
        GET_LIST,
        null,
        null,
        null,
        params.limit,
        params.offset
      );
      return requestSuccess(res, "User  fetched successfully", data);
    }
  } catch (error) {
    console.log(error);
    return errorResponse(
      res,
      "error in fetching  User ",
      null
    );
  }
};


exports.DeleteUserData = async (req, res) => {
  try {
    let params = { ...req.params, ...req.body, ...req.query };
    console.log("id is comming or not", params.id);
    if (checkIsset(params.id)) {
      if (!params.id) {
        return errorResponse(res, "_id required ", null);
      }
    }
    const data = await User.deleteData(params.id);
    return requestSuccess(res,"data successfully fetched",data)
  } catch (error) {
    console.log(error);
    return errorResponse(res, error, "err in deleting the user ");
  }
};
