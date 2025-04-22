const errorMiddleware = (error, req, res, next) => {
  res.status(error.status || 500).json({
    message: error.message || "INTERNAL SERVER ERROR",
  });
};
export default errorMiddleware;
