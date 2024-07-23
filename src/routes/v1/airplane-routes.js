const express  = require("express");
const { AirplaneController } = require("../../controllers");
const validateCreateRequest = require("../../middlewares/airplane-middleware");
const airplaneRouter = express.Router();

airplaneRouter.post('/', validateCreateRequest, AirplaneController.createAirplane);

module.exports = airplaneRouter;