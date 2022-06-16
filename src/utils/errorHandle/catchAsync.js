const catchAsync = (cb) => {
    return (req, res, next) => {
        cb(err="", req, res, next).catch((err) => {
            return next(err);
        });
    }
}

module.exports = catchAsync;