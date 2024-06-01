// @desc this class is responsible about operaion errers

class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.statusCode = `${statusCode}`.startsWith(4) ? "fail" : "error";
    this.isOperational = true;
  }
}

export default ApiError;
