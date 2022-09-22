const bcrypt = require ('bcrypt');
exports.returnSuccess = (req, res, message = "", data = "") => {
  res.status(200).json({
    code: 0,
    status: "success",
    message,
    data,
  });
};
exports.returnFail = (req, res, err) => {
  res.status(400).json({
    code: err.statusCode ? err.statusCode : "4",
    status: err.status ? err.status : "error",
    message: err.message,
  });
};

exports.hashPassword = async(password) => {
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password,salt);
  return hashPassword;
};