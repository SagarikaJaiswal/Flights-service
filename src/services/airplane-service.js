const { StatusCodes } = require("http-status-codes");
const AirplaneRepository = require("../repositories/airplane-repository");
const { AppError }  = require("../utils/errors");
const airplaneRepository = new AirplaneRepository();

async function createAirplane(data){
    try {
        const airplane = await airplaneRepository.create(data);
        return airplane;
    } catch (error) {
        if(error.name == "SequelizeValidationError"){
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            })
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError("Airplane cannot be created", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    createAirplane
}