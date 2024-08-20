const { StatusCodes } = require("http-status-codes");
const FlightRepository = require("../repositories/flight-repository");
const { AppError }  = require("../utils/errors");
const {dateTimeHelper} = require("../utils/helpers");
const { Op } = require("sequelize");
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

async function getAllFlights(query){
    let customFilter = {};
    let sortFilter = [];
    const endingTime = " 23:59:59";
    // trips: MUM-DEL
    if(query.trips){
        const [departureAirportId, arrivalAirportId] = query.trips.split("-");
        customFilter.departureAirportId = departureAirportId;
        customFilter.arrivalAirportId = arrivalAirportId;
    }
    // price: 3000-6000
    if(query.price){
        const [minPrice, maxPrice] = query.price.split("-");
        customFilter.price = {
            [Op.between]: [minPrice, ((maxPrice == undefined) ? 10000 : maxPrice)]
        }
    }
    if(query.travellers){
        customFilter.totalSeats = {
            [Op.gte]: query.travellers
        }
    }
    if(query.departureTime){
        customFilter.departureTime = {
            [Op.between]: [query.departureTime, query.departureTime + endingTime]
        }
    }
    // sort = departurTime_ASC, price_DESC
    if(query.sort){
        let params = query.sort.split(",");
        let sortFilters = params.map((param) => param.split("_"));
        sortFilter = sortFilters;
    }
    try {
        const flights = await flightRepository.getAllFlights(customFilter, sortFilter);
        return flights;
    } catch (error) {
        console.log(error);
        throw new AppError("Cannot fetch data of all flights", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getFlight(id){
    try {
        const flight = await flightRepository.get(id);
        return flight;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError("The flight you requested does not exist", StatusCodes.NOT_FOUND);
        }
        throw new AppError("Cannot fetch flight currently", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
module.exports = {
    createFlight,
    getAllFlights,
    getFlight
}