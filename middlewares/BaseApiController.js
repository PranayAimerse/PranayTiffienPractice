const {checkIsset} = require("../config/constant");
const {checkKeyExist} = require("../config/constant");
const {
    HTTP_NOT_FOUND,
    HTTP_RESET_CONTENT,
    HTTP_OK,
    HTTP_BAD_REQUEST,
    TOKEN,
    checkIsArray,
    checkKeyInObject
} = require("../config/constant");
exports.removeNameValuePairs = (inputs) => {
    // let params = {...inputs};
    // if (params?.nameValuePairs) {
    //     params = params?.nameValuePairs;
    // }
    //
    // if (!checkIsObject(params)) {
    //     let object = {};
    //     params?.forEach((value, key) => {
    //         object.key = value;
    //     });
    //
    //     params = {...object};
    // }

    let params = inputs?.nameValuePairs || {...inputs};

    if (Array.isArray(params)) {
        params = Object.fromEntries(params.map(([key, value]) => [key, value]));
    }

    return params;
}

exports.verifyParams = (response, inputs) => {
    let params = this.removeNameValuePairs(inputs)
    const TOKEN="ABCD"

    if (!checkIsset(params?.device_type) || !params?.device_type) {
        return this.requestError(response, 'android', "Device type");
    } else if (!checkIsset(params?.gnstoken) || !params?.gnstoken) {
        return this.requestError(response, params?.device_type, "Token");
    } else if (params?.gnstoken !== TOKEN) {
        return this.requestError(response, params?.device_type, "Token given is not valid");
    } else {
        return null;
    }
}

exports.requestParam = (res, deviceType = 'android', params = null, additionalData = null) => {
    if (params) {
        let message = {
            'error': true,
            'message': (params || "") + ' required to continue.',
            'data': [],
            'status': HTTP_BAD_REQUEST
        };
        if (deviceType === 'android') {
            message.data = null;
        } else {
            message.data = [];
        }
        if (additionalData && Array.isArray(additionalData)) {
            message = [...message, ...additionalData];
        }
        return res.json(message);
    } else {
        return res.json({
            'error': true,
            'message': "NOT FOUND",
            'data': null,
            'status': HTTP_BAD_REQUEST
        });
    }
}

exports.requestError = (res, params = null,  deviceType = 'android',additionalData = null) => {
    if (params) {
        let message = {
            'error': true,
            'message': params || "",
            'data': [],
            'status': HTTP_BAD_REQUEST
        };
        if (deviceType === 'android') {
            message.data = null;
        } else {
            message.data = [];
        }
        if (additionalData && Array.isArray(additionalData)) {
            message = [...message, ...additionalData];
        }
        return res.json(message);
    } else {
        return res.json({
            'error': true,
            'message': "NOT FOUND",
            'data': null,
            'status': HTTP_BAD_REQUEST
        });
    }
}

exports.checkDeviceType = (res, data, dataTitle, deviceType = 'android', action = 'found', additionalData = false) => {
    if (deviceType === 'ios') {
        if (checkIsArray(data)) {
            return this.sendData(res, data, dataTitle, action, additionalData, deviceType);
        } else {
            let dataArray;
            if (data) {
                dataArray = [data];
            } else {
                dataArray = data;
            }
            return this.sendData(res, dataArray, dataTitle, action, additionalData, deviceType);
        }
    } else {
        return this.sendData(res, data, dataTitle, action, additionalData, deviceType);
    }
}

exports.sendData = (res, data, dataTitle = "", action = 'found', additionalData = null, deviceType = 'android') => {
    let messageBody;
    if (data) {
        messageBody = {
            'message': (dataTitle || "") + ' ' + (action || "") + ' successfully',
            'error': false,
            'data': data,
            'status': HTTP_OK
        };
        if (additionalData && checkIsArray(additionalData)) {
            messageBody = [...messageBody, ...additionalData];
        }
    } else if (data?.length <= 0) {
        messageBody = {
            'error': true,
            'message': (dataTitle || "") + ' can not be ' + (action || "") + '. Please try later.',
            'status': HTTP_RESET_CONTENT
        };
        if (deviceType === 'android') {
            messageBody.data = null;
        } else {
            messageBody.data = [];
        }
        if (additionalData && checkIsArray(additionalData)) {
            messageBody = [...messageBody, ...additionalData];
        }
    } else {
        // Set the response and exit
        messageBody = {
            'error': true,
            'message': (dataTitle || "") + ' can not be ' + (action || "") + '. Please try later.',
            'status': HTTP_NOT_FOUND
        };
        if (deviceType === 'android') {
            messageBody.data = null;
        } else {
            messageBody.data = [];
        }

        if (additionalData && checkIsArray(additionalData)) {
            messageBody = [...messageBody, ...additionalData];
        }
    }

    return res.status(HTTP_OK).json(messageBody);
}

exports.requestSuccess = (res,  message = "",dataParam = null,deviceType = 'android', ) => {
    let messageBody;
    messageBody = {
        'error': false,
        'message': message || "No Message found",
        'data': dataParam,
        'status': HTTP_OK
    };
    if (deviceType === 'android') {
        messageBody.data = dataParam;
    } else {
        messageBody.data = dataParam ?? [];
    }

    return res.status(HTTP_OK).json(messageBody);
}