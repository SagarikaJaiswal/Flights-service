const express  = require("express");
const { CityController } = require("../../controllers");
const cityRouter = express.Router();

cityRouter.post('/', CityController.createCity);
cityRouter.get('/', CityController.getCities);
cityRouter.get('/:id', CityController.getCity);
cityRouter.delete('/:id', CityController.destroyCity);
cityRouter.patch('/:id', CityController.updateCity);

module.exports = cityRouter;