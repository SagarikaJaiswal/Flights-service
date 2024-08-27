const { Sequelize } = require("sequelize");
const CrudRepository = require("./crud-repository");
const { Flight, Airplane, Airport } = require("../models");
const db = require("../models");
const { addRowLockOnFlights } = require("./queries");
class FlightRepository extends CrudRepository {
    constructor(){
        super(Flight);
    }

    async getAllFlights(filter, sort){
        const flights = await Flight.findAll({
            where: filter,
            order: sort,
            include: [
                {
                model: Airplane,
                required: true,
                as: "airplaneDetail"
                },
                {
                model: Airport,
                required: true,
                as: "departureAirport",
                on: {
                    col1: Sequelize.where(Sequelize.col("Flight.departureAirportId"), "=", Sequelize.col("departureAirport.code"))
                }
                },
                {
                    model: Airport,
                    required: true,
                    as: "arrivalAirport",
                    on: {
                        col1: Sequelize.where(Sequelize.col("Flight.arrivalAirportId"), "=", Sequelize.col("arrivalAirport.code"))
                    }
                }
            ]
        })
        return flights;
    }

    async updateSeats(flightId, seats, dec = true) {
        const transaction = await db.sequelize.transaction();
        try {
            // while updating the seats we add a row lock (pessimistic concurrency control)
            await db.sequelize.query(addRowLockOnFlights(flightId));
            const flight = await Flight.findByPk(flightId);
            if(Number(dec)) {
                await flight.decrement('totalSeats', { by: seats }, {transaction: transaction});
            }else {
                await flight.increment('totalSeats', { by: seats }, {transaction: transaction});
            }
            await transaction.commit();
            return flight;
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
        
    }
}

module.exports = FlightRepository;