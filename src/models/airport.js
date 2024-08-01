'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Airport extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Cities,{
        foreignKey: "cityId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      })
    }
  }
  Airport.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    address: {
      type: DataTypes.STRING,
      unique: true
    },
    cityId: {
      type: DataTypes.INTEGER,
      allowNull: false  // aiport will belong to a city
      // there can be airports with the same cityId so unique constraint will not be there
    }
  }, {
    sequelize,
    modelName: 'Airport',
  });
  return Airport;
};