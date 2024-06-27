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
      fullName: DataTypes.STRING,
      mobile: DataTypes.STRING,
      addresses: DataTypes.JSON
    },
    {
      sequelize,
      modelName: 'address'
    }
  );
  return address;
};
