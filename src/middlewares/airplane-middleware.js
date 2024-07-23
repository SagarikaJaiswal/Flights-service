const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");

function validateCreateRequest(req, res, next){
    if(!req.body.modelNumber){
        ErrorResponse.message = "Something went wrong while craeting the airplane";
        ErrorResponse.error =  {explanation: "Model Number not found in incoming request"}
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse);
    }
    next();
}

module.exports = validateCreateRequest;