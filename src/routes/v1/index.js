const express  = require("express");
const cityRouter = require("./city-routes");
const airportRouter = require("./airport-routes");
const airplaneRouter = require("./airplane-routes")
const v1Router = express.Router();

v1Router.use("/airplanes", airplaneRouter);
v1Router.use("/cities", cityRouter);
v1Router.use("/airports", airportRouter);

module.exports = v1Router;