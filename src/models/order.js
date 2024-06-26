'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  order.init(
    {
      userId: DataTypes.INTEGER,
      addressId: DataTypes.INTEGER,
      books: {
        type: DataTypes.JSONB,
        allowNull: false,
        defaultValue: []
      },
      fullName: DataTypes.STRING,
      mobile: DataTypes.STRING,
      totalAmount: DataTypes.DECIMAL(20, 2),
      status: {
        type: DataTypes.ENUM(
          'Pending',
          'Processing',
          'Shipped',
          'Delivered',
          'Cancelled'
        ),
        defaultValue: 'Pending'
      },
      paymentStatus: {
        type: DataTypes.ENUM('Pending', 'Completed', 'Failed', 'Refunded'),
        defaultValue: 'Pending'
      }
    },
    {
      sequelize,
      modelName: 'order'
    }
  );
  return order;
};
