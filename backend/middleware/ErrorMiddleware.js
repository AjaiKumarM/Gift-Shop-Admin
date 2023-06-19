const ErrorHandling = require("../utils/errorHandling");

module.exports = (err, req, res, next) => {
  err.statuscode = err.statuscode || 500;

  //Development Section Error
  if (process.env.NODE_ENV == "development") {
    res.status(401).json({
      success: false,
      message: err.message,
      stack: err.stack,
      error: err,
    });
  }
  //Production Section Error
  if (process.env.NODE_ENV == "production") {
    let message = err.message;
    let error = new ErrorHandling(message, 401);

    if (err.name == "ValidationError") {
      message = Object.values(err.errors).map((value) => value.message);
      error = new ErrorHandling(message, 401);
    }
    if(err.name == "CastError"){
        message = `Resource not found : ${err.path}`;
        error = new ErrorHandling(message,401);
    }
    if(err.code == 11000){
      message = "You entered Email id is Already Registered";
      error = new ErrorHandling(message,401);
    }

    res.status(error.statuscode).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};
