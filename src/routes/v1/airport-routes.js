const express  = require("express");
const { AirportController } = require("../../controllers");
const { AirportMiddleware } = require("../../middlewares");
const airportRouter = express.Router();

airportRouter.post('/', AirportMiddleware.validateAirportCreateRequest ,AirportController.createAirport);
airportRouter.get('/', AirportController.getAirports);
airportRouter.get('/:id', AirportController.getAirport);
airportRouter.delete('/:id', AirportController.destroyAirport);
airportRouter.patch('/:id', AirportController.updateAirport);

module.exports = airportRouter;