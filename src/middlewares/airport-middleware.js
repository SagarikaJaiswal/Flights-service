const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const { AppError } = require("../utils/errors");

function validateAirportCreateRequest(req, res, next){
    if(!req.body.name){
        ErrorResponse.message = "Something went wrong while creating the airport";
        ErrorResponse.error =  new AppError(["name Number not found in incoming request"], StatusCodes.BAD_REQUEST);
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse);
    }
    if(!req.body.code){
        ErrorResponse.message = "Something went wrong while creating the airport";
        ErrorResponse.error =  new AppError(["code Number not found in incoming request"], StatusCodes.BAD_REQUEST);
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse);
    }
    if(!req.body.cityId){
        ErrorResponse.message = "Something went wrong while creating the airport";
        ErrorResponse.error =  new AppError(["cityId Number not found in incoming request"], StatusCodes.BAD_REQUEST);
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse);
    }
    next();
}

module.exports = { validateAirportCreateRequest };