'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class wishlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  wishlist.init(
    {
      userId: DataTypes.INTEGER,
      bookIds: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false,
        defaultValue: []
      }
    },
    {
      sequelize,
      modelName: 'wishlist'
    }
  );
  return wishlist;
};
