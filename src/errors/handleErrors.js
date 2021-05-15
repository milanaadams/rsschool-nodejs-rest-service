function handleErrors(err, req, res, next) {
  if (!res.headersSent) {
    res.status(err.status || 500).json({ message: err.message || 'Something went went' });
  }
  next();
}

module.exports = { handleErrors };
