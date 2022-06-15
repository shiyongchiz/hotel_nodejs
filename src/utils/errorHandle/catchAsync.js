const catchAsync = (cb) => {
    return (req, res, next) => {
        cb(err, res, next).catch((err) => {
            return next(err);
        });
    }
}

module.exports = catchAsync;