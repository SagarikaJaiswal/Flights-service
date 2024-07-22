const { AirplaneService } = require("../services");
const { StatusCodes } = require("http-status-codes")
/**
 * 
 * POST : /airplanes
 * req.body -> {modelNumber: 'airbus42' , capacity: 100}
 */
async function createAirplane(req, res){
    try {
        const airplane = await AirplaneService.createAirplane({
            modelNumber: req.body.modelNumber,
            capacity: req.body.capacity
        });
        return res
        .status(StatusCodes.CREATED)
        .json({
            success: true,
            message: "Successfully created an airplane",
            data: airplane,
            error: {}
        });
    } catch (error) {
        return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
            success: false,
            message: "Something went wrong in creating an airplane",
            data: {},
            error: error
        });
    }
}

module.exports = {
    createAirplane
}