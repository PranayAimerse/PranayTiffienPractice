const {ProductType}=require("../models/")

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
      } else if (!(tempData = await ProductType.getByKey(GET_OBJECT, {id: params.id}))) {
        return errorResponse(res, "Invalid ID", null);
      } else if (!params.values) {
        return errorResponse(res, "values required ", null);
      } else if (!checkIsObject(params.values)) {
        return errorResponse(res, "values must be object of updating values ", null);
      } else {
        const dataset=await ProductType.filterValidAttributes(params.values);
       
        const updateddata = await ProductType.updateData(dataset, params.id);
        return sendData(res,updateddata, "ProductType", ACTION_UPDATED,null,params?.device_type);
      }
    } else if (!params?.title) {
      return errorResponse(res, "title required ", null);
    } else{
        const dataset=await ProductType.filterValidAttributes(params);
        // dataset.url_image="";

      const Data = await ProductType.insertData(dataset);
      return sendData(res,Data, "ProductType", ACTION_INSERTED,null,params?.device_type);
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
    if (checkIsset(params.product_type_id)) {
      if (!params.product_type_id) {
        return errorResponse(res, "product_type_id required ", null);
      } else if (
        !(tempData = await ProductType.getByKey(GET_OBJECT, {
          id: params.product_type_id
        }))
      ) {
        return errorResponse(res, "Invalid product_type_id", null);
      } else {
        const data = await ProductType.getFullById(tempData?.id);
        return sendData(res,data, "ProductType",ACTION_GET ,null,params?.device_type);
      }
    } else if (checkIsset(params.token_product_type)) {
      if (!params.token_product_type) {
        return errorResponse(res, "token_ required ", null);
      } else if (
        !(tempData = await ProductType.getByKey(GET_OBJECT, {
          token: params.token_product_type
        }))
      ) {
        return errorResponse(res, "Invalid token_product_type", null);
      } else {
        const data = await ProductType.getFullById(tempData.id);
        return successResponse(res, "fetched", data);
      }
    } else if (checkIsset(params.slug_ProductType)) {
      if (!params.slug_ProductType) {
        return errorResponse(res, "slug required ", null);
      } else if (
        !(tempData = await ProductType.getByKey(GET_OBJECT, {
          slug: params.slug_ProductType
        }))
      ) {
        return errorResponse(res, "Invalid slug", null);
      } else {
        const data = await ProductType.getFullById(tempData.id);
        return successResponse(res, "ProductType get", data);
      }
    } else if (!checkIsset(params.limit) || !checkIsNumber(params.limit)) {
      return errorResponse(res, "limit required ", null);
    } else if (!checkIsset(params.offset) || !checkIsNumber(params.offset)) {
      return errorResponse(res, "offset required ", null);
    } else {
      const data = await ProductType.getByKey(
        GET_LIST,
        null,
        null,
        null,
        params.limit,
        params.offset
      );
      return requestSuccess(res, "ProductType  fetched successfully", data);
    }
  } catch (error) {
    console.log(error);
    return errorResponse(
      res,
      "error in fetching  ProductType ",
      null
    );
  }
};


exports.DeleteProductType = async (req, res) => {
  try {
    let params = { ...req.params, ...req.body, ...req.query };
    console.log("id is comming or not", params.id);
    if (checkIsset(params.id)) {
      if (!params.id) {
        return errorResponse(res, "_id required ", null);
      }
    }
    const data = await ProductType.deleteData(params.id);
    return requestSuccess(res,"data successfully deleted",data)
  } catch (error) {
    console.log(error);
    return errorResponse(res, "errro in deleting productmealPlan ", error);
  }
};
