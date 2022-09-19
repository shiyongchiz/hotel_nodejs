const catchAsync = (cb) => (req, res, next) => {
  cb(err = '', req, res, next).catch((err) => next(err));
};

module.exports = catchAsync;
