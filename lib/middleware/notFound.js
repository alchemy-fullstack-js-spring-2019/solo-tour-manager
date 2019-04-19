module.exports = (req, res, next) => {
  const error = new Error('404 - Page Not Found');
  error.status = 404;
  next(error);
};
