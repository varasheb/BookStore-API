'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    static associate(models) {}
  }

  Cart.init(
    {
      userId: DataTypes.INTEGER,
      books: {
        type: DataTypes.JSONB,
        allowNull: false,
        defaultValue: []
      },
      totalPrice: DataTypes.DECIMAL(20, 2),
      totalDiscountPrice: DataTypes.DECIMAL(20, 2)
    },
    {
      sequelize,
      modelName: 'Cart'
    }
  );

  return Cart;
};
