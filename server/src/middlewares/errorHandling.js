const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || (err.name === "ValidationError" ? 400 : 500);
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};

export default errorHandler;
