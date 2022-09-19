exports.returnSuccess = (req, res, code = 0, data = '', message = '') => res.status(200).json({
  code,
  status: 'success',
  data,
  message,
});

exports.returnFail = (req, res, code, err) => {
  const message = JSON.stringify(err, Object.getOwnPropertyNames(err));
  return res.status(400).json({
    code,
    status: 'fail',
    message,
  });
};
