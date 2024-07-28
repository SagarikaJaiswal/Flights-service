const { StatusCodes } = require("http-status-codes");
const CityRepository = require("../repositories/city-repository");
const { AppError }  = require("../utils/errors");
const cityRepository = new CityRepository();

async function createCity(data){
    try {
        const city = await cityRepository.create(data);
        return city;
    } catch (error) {
        // give meaningful error messages for validation errors
        console.log(error);
        if(error.name == "SequelizeValidationError" || error.name == "SequelizeUniqueConstraintError"){
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            })
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError("City cannot be created", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getCities(){
    try {
        const cities = await cityRepository.getAll();
        console.log(cities);
        return cities;
    } catch (error) {
        throw new AppError("Cannot fetch cities currently", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getCity(id){
    try {
        const city = await cityRepository.get(id);
        return city;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError("The city you requested does not exist", StatusCodes.NOT_FOUND);
        }
        throw new AppError("Cannot fetch city currently", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function destroyCity(id){
    try {
        const city = await cityRepository.destroy(id);
        return city;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError("The city you tried to delete does not exist", StatusCodes.NOT_FOUND);
        }
        throw new AppError("Cannot fetch city currently", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updateCity(id, data){
    try {
        const city = await cityRepository.update(id, data);
        return city;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError("The city you tried to update does not exist", StatusCodes.NOT_FOUND);
        }
        throw new AppError("Cannot fetch city currently", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
module.exports = {
    createCity,
    getCities,
    getCity,
    destroyCity,
    updateCity
}