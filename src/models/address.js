'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  address.init(
    {
      userId: DataTypes.INTEGER,
      addressType: DataTypes.ENUM('Home', 'Work', 'Other'),
      addressLine1: DataTypes.STRING,
      addressLine2: DataTypes.STRING,
      city: DataTypes.STRING,
      state: DataTypes.STRING,
      postalCode: DataTypes.STRING,
      country: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'address'
    }
  );
  return address;
};
