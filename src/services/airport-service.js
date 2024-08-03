const { StatusCodes } = require("http-status-codes");
const AirportRepository = require("../repositories/airport-repository");
const { AppError }  = require("../utils/errors");
const airportRepository = new AirportRepository();

async function createAirport(data){
    try {
        const airport = await airportRepository.create(data);
        return airport;
    } catch (error) {
        // give meaningful error messages ofr validation errors
        if(error.name == "SequelizeValidationError"){
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            })
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError("Airport cannot be created", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirports(){
    try {
        const airports = await airportRepository.getAll();
        return airports;
    } catch (error) {
        throw new AppError("Cannot fetch airports currently", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirport(id){
    try {
        const airport = await airportRepository.get(id);
        return airport;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError("The airport you requested does not exist", StatusCodes.NOT_FOUND);
        }
        throw new AppError("Cannot fetch airport currently", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function destroyAirport(id){
    try {
        const airport = await airportRepository.destroy(id);
        return airport;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError("The airport you tried to delete does not exist", StatusCodes.NOT_FOUND);
        }
        throw new AppError("Cannot fetch airport currently", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updateAirport(id, data){
    try {
        const airport = await airportRepository.update(id, data);
        return airport;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError("The airport you tried to update does not exist", StatusCodes.NOT_FOUND);
        }
        throw new AppError("Cannot fetch airport currently", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
module.exports = {
    createAirport,
    getAirports,
    getAirport,
    destroyAirport,
    updateAirport
}