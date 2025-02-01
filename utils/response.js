exports.errorResponse = (res,err,message) => {
    return res.json({
        error: true,
        err:err,
        message: message,
        data: null,
        status: 400
    })
}

exports.successResponse = (res,message, data) => {
    return res.json({
        error: false,
        message: message,
        data:data,
        status: 200
    })
}