


exports.returnSuccess = (req, res, data = "", message = "") => {
    return res.status(200).json({
        status: "success",
        data,
        message
    })
}

exports.returnFail = (req, res, err) => {
    message = JSON.stringify(err, Object.getOwnPropertyNames(err))
    return res.status(400).json({
        status: "fail",
        message
    })
}