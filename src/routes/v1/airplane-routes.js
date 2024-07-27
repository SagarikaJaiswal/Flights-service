const express  = require("express");
const { AirplaneController } = require("../../controllers");
const validateCreateRequest = require("../../middlewares/airplane-middleware");
const airplaneRouter = express.Router();

airplaneRouter.post('/', validateCreateRequest, AirplaneController.createAirplane);
airplaneRouter.get('/', AirplaneController.getAirplanes);
airplaneRouter.get('/:id', AirplaneController.getAirplane);
airplaneRouter.delete('/:id', AirplaneController.destroyAirplane);


module.exports = airplaneRouter;