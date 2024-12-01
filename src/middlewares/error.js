import ErrorResponse from '../../utils/errorResponse.js'

const ErrorHandler = (err, req, res, next) => {
  let error = err;
  err.message = err.message;

  // Duplicate error
  if (err.code === 11000) {
    const message = "Already registered";
    error = new ErrorResponse(message, 404);
  }

  // mongo bad Object error
  if (err.name === "CastError") {
    const message = `invalid id`;
    error = new ErrorResponse(message, 404);
  }

  if (err instanceof ReferenceError) {
    const errorMessage = err.message;
    error = new ErrorResponse(errorMessage, 404); // You can choose an appropriate status code
  }

  if (err instanceof TypeError) {
    const errorMessage = err.message;
    error = new ErrorResponse(errorMessage, 404); // You can choose an appropriate status code
  }

  // Mongo validation error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 404);
  }

  // Validation errors
  if (err.message.includes("User validation failed")) {
    const getErrMessage = {};
    Object.values(err.errors).forEach(({ properties }) => {
      if (properties.path) {
        getErrMessage[properties.path] = properties.message;
      }
    });

    const errorMessage = Object.values(getErrMessage).join(", ");
    error = new ErrorResponse(errorMessage, 404);
  }

  // Handle other general errors
  const statusCode = error?.statusCode || 500;
  const message = error.message || "Internal Server Error";
  res.status(statusCode).json({ status: false, message: message });
};

export default ErrorHandler;