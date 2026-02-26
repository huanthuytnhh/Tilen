const responseHelper = {
  success: (res, data) => {
    res.status(200).json(data);
  },

  error: (res, message, statusCode = 500) => {
    res.status(statusCode).json({ message });
  },
};

module.exports = responseHelper;
