const express  = require("express");
const { FlightController } = require("../../controllers");
const {FlightMiddleware} = require("../../middlewares");
const flightRouter = express.Router();

flightRouter.post('/',
    FlightMiddleware.validateFlightCreateRequest, 
    FlightController.createFlight);

module.exports = flightRouter;