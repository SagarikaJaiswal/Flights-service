const express  = require("express");
const { FlightController } = require("../../controllers");
const {FlightMiddleware} = require("../../middlewares");
const flightRouter = express.Router();

flightRouter.post('/',
    FlightMiddleware.validateFlightCreateRequest, 
    FlightController.createFlight);

flightRouter.get("/", FlightController.getAllFlights);
flightRouter.get("/:id", FlightController.getFlight);
module.exports = flightRouter;