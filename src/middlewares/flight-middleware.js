const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const { AppError } = require("../utils/errors");

function validateFlightCreateRequest(req, res, next){
    if(!req.body.flightNumber){
        ErrorResponse.message = "Something went wrong while creating the airplane";
        ErrorResponse.error =  new AppError(["Flight Number not found in incoming request"], StatusCodes.BAD_REQUEST);
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse);
    }
    if(!req.body.airplaneId){
        ErrorResponse.message = "Something went wrong while creating the airplane";
        ErrorResponse.error =  new AppError(["Airplane Id not found in incoming request"], StatusCodes.BAD_REQUEST);
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse);
    }
    if(!req.body.departureAirportId){
        ErrorResponse.message = "Something went wrong while creating the airplane";
        ErrorResponse.error =  new AppError(["Departure airport id not found in incoming request"], StatusCodes.BAD_REQUEST);
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse);
    }
    if(!req.body.arrivalAirportId){
        ErrorResponse.message = "Something went wrong while creating the airplane";
        ErrorResponse.error =  new AppError(["Arrival airport id not found in incoming request"], StatusCodes.BAD_REQUEST);
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse);
    }
    if(!req.body.arrivalTime){
        ErrorResponse.message = "Something went wrong while creating the airplane";
        ErrorResponse.error =  new AppError(["Arrival time not found in incoming request"], StatusCodes.BAD_REQUEST);
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse);
    }
    if(!req.body.departureTime){
        ErrorResponse.message = "Something went wrong while creating the airplane";
        ErrorResponse.error =  new AppError(["Departure time not found in incoming request"], StatusCodes.BAD_REQUEST);
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse);
    }
    if(!req.body.totalSeats){
        ErrorResponse.message = "Something went wrong while creating the airplane";
        ErrorResponse.error =  new AppError(["Total seats not found in incoming request"], StatusCodes.BAD_REQUEST);
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse);
    }
    next();
}

module.exports = { validateFlightCreateRequest };