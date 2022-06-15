


exports.returnSuccess = (req,res,data = "") => {
    return res.status(200).json({
        status: "success",
        data: data
    })
}

exports.returnFail = (req,res,err = "") => {
    return res.status(400).json({
        status: "fail",
        err: err
    })
}