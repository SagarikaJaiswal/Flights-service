const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const { AppError } = require("../utils/errors");

function validateCityCreateRequest(req, res, next){
    if(!req.body.name){
        ErrorResponse.message = "Something went wrong while creating the city";
        ErrorResponse.error =  new AppError(["Name not found in incoming request"], StatusCodes.BAD_REQUEST);
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse);
    }
    next();
}

module.exports = { validateCityCreateRequest };