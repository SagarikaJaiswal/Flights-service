const express  = require("express");
const airplaneRouter = require("./airplane-routes");

const v1Router = express.Router();

v1Router.use('/airplanes', airplaneRouter);

module.exports = v1Router;