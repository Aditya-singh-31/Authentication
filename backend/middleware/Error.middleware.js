const errorMiddleware = (err, req, res, next) => {
  console.log("error middleware", err.message);

  const statusCode = err.statusCode || 500;

  return res.status(statusCode).json({
    message: err.message || "Internal server error",
    success: false,
  });
};


module.exports = errorMiddleware;