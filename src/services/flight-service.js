const { StatusCodes } = require("http-status-codes");
const FlightRepository = require("../repositories/flight-repository");
const { AppError }  = require("../utils/errors");
const {dateTimeHelper} = require("../utils/helpers")
const flightRepository = new FlightRepository();

async function createFlight(data){
    try {
        const {arrivalTime, departureTime} = data;
        if(!dateTimeHelper.compareTime(arrivalTime, departureTime)){
            throw new AppError("Arrival time cannot be less than departure time", StatusCodes.BAD_REQUEST);
        }
        const flight = await flightRepository.create(data);
        return flight;
    } catch (error) {
        // give meaningful error messages for validation errors
        if(error.name == "SequelizeValidationError"){
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            })
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        else if(error.statusCode == StatusCodes.BAD_REQUEST){
            throw new AppError(error.message, error.statusCode);
        }
        throw new AppError("Flight cannot be created", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    createFlight
}