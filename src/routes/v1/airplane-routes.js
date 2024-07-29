const express  = require("express");
const { AirplaneController } = require("../../controllers");
const {AirplaneMiddleware} = require("../../middlewares");
const airplaneRouter = express.Router();

airplaneRouter.post('/', AirplaneMiddleware.validateAirplaneCreateRequest, AirplaneController.createAirplane);
airplaneRouter.get('/', AirplaneController.getAirplanes);
airplaneRouter.get('/:id', AirplaneController.getAirplane);
airplaneRouter.delete('/:id', AirplaneController.destroyAirplane);
airplaneRouter.patch('/:id', AirplaneController.updateAirplane);

module.exports = airplaneRouter;