'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    static associate(models) {}
  }

  Cart.init(
    {
      userId: DataTypes.INTEGER,
      bookId: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      bookName: DataTypes.STRING,
      author: DataTypes.STRING,
      price: DataTypes.DECIMAL(10, 2),
      totalPrice: DataTypes.DECIMAL(20, 2),
      isOrderPlaced: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },
    {
      sequelize,
      modelName: 'Cart'
    }
  );

  return Cart;
};
