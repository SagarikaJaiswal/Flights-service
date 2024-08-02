'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Flight extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Airplane,{
        foreignKey: "airplaneId"
      });

      this.belongsTo(this.Airport, {
        foreignKey: "departureAirportId"
      });

      this.belongsTo(this.Airport, {
        foreignKey: "arrivalAirportId"
      });
    }
  }
  Flight.init({
    flightNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    airplaneId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Airplane",
        key: "id"
      },
      onDelete: "CASCADE"
    },
    departureAirportId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "Airport",
        key: "code"
      },
      onDelete: "CASCADE"
    },
    arrivalAirportId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "Airport",
        key: "code"
      },
      onDelete: "CASCADE"
    },
    arrivalTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    departureTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    boardingGate: {
      type: DataTypes.STRING
    },
    totalSeats: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Flight',
  });
  return Flight;
};