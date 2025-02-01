const { errorResponse, successResponse } = require("../utils/response");
const { AlterAdminOffer } = require("../models");
const baseApiController=require("./../middlewares/BaseApiController") 
const {
  checkIsset,
  GET_LIST,
  GET_OBJECT,
  checkIsNumber,
  checkIsObject,
  ACTION_GET,
  ACTION_UPDATED,
  ACTION_INSERTED
} = require("../config/constant");
const {
  requestParam,
  sendData,
  requestSuccess
} = require("../middlewares/BaseApiController");
 
exports.UpdateData = async (req, res) => {
  try {
    let params = baseApiController.removeNameValuePairs({ ...req.params, ...req.body, ...req.query });

    if (!checkIsObject(params)) {
      return requestError(res, params?.device_type, "params can not be null");
    } else if (checkIsset(params.id)) {
      if (!params.id) {
        return errorResponse(res, "id required ", null);
      } else if (!(tempData = await AlterAdminOffer.getByKey(GET_OBJECT, {id: params.id}))) {
        return errorResponse(res, "Invalid ID", null);
      } else if (!params.values) {
        return errorResponse(res, "values required ", null);
      } else if (!checkIsObject(params.values)) {
        return errorResponse(res, "values must be object of updating values ", null);
      } else {
        const dataset=await AlterAdminOffer.filterValidAttributes(params.values);
       
        const updateddata = await AlterAdminOffer.updateData(dataset, params.id);
        return sendData(res,updateddata, "AlterAdminOffer", ACTION_UPDATED,null,params?.device_type);
      }
    } else if (!params?.title) {
      return errorResponse(res, "title required ", null);
    } else if (!params?.description) {
      return errorResponse(res, "description required ", null);
    // } else if (!req.files?.url_image[0]) {
    //   return errorResponse(res, "url_image required ", null);
    } else{
        const dataset=await AlterAdminOffer.filterValidAttributes(params);
        // dataset.url_image="";

      const Data = await AlterAdminOffer.insertData(dataset);
      return sendData(res,Data, "AlterAdminOffer", ACTION_INSERTED,null,params?.device_type);
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
    if (checkIsset(params.admin_offer_id)) {
      if (!params.admin_offer_id) {
        return errorResponse(res, "admin_offer_id required ", null);
      } else if (
        !(tempData = await AlterAdminOffer.getByKey(GET_OBJECT, {
          id: params.admin_offer_id
        }))
      ) {
        return errorResponse(res, "Invalid admin_offer_id", null);
      } else {
        const data = await AlterAdminOffer.getFullById(tempData?.id);
        return successResponse(res, "alter_admin_Offer fetched", data);
      }
    } else if (checkIsset(params.token_admin_offer)) {
      if (!params.token_admin_offer) {
        return errorResponse(res, "token_admin_offer required ", null);
      } else if (
        !(tempData = await AlterAdminOffer.getByKey(GET_OBJECT, {
          token: params.token_admin_offer
        }))
      ) {
        return errorResponse(res, "Invalid token_admin_offer", null);
      } else {
        const data = await AlterAdminOffer.getFullById(tempData.id);
        return successResponse(res, "alter_admin_Offer deleted", data);
      }
    } else if (checkIsset(params.slug_admin_offer)) {
      if (!params.slug_admin_offer) {
        return errorResponse(res, "slug_admin_offer required ", null);
      } else if (
        !(tempData = await AlterAdminOffer.getByKey(GET_OBJECT, {
          slug: params.slug_admin_offer
        }))
      ) {
        return errorResponse(res, "Invalid slug_admin_offer", null);
      } else {
        const data = await AlterAdminOffer.getFullById(tempData.id);
        return successResponse(res, "alter_admin_Offer get", data);
      }
    } else if (!checkIsset(params.limit) || !checkIsNumber(params.limit)) {
      return errorResponse(res, "limit required ", null);
    } else if (!checkIsset(params.offset) || !checkIsNumber(params.offset)) {
      return errorResponse(res, "offset required ", null);
    } else {
      const data = await AlterAdminOffer.getByKey(
        GET_LIST,
        null,
        null,
        null,
        params.limit,
        params.offset
      );
      return requestSuccess(res, "admine offer fetched successfully", data);
    }
  } catch (error) {
    console.log(error);
    return errorResponse(
      res,
      "error in fetching  the alter admine offer data ",
      null
    );
  }
};

exports.DeleteAlterAdminOffer = async (req, res) => {
  try {
    let params = { ...req.params, ...req.body, ...req.query };
    console.log("id is comming or not", params.id);
    if (checkIsset(params.id)) {
      if (!params.id) {
        return errorResponse(res, "admin_offer_id required ", null);
      }
    }
    const data = await AlterAdminOffer.deleteData(params.id);
    return requestSuccess(res, data, " Admin Offer deleted success");
  } catch (error) {
    return errorResponse(res, "error in delting the data ", null);
  }
};
