'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      book.belongsTo(models.user, { foreignKey: 'userId', as: 'user' });
    }
  }
  book.init(
    {
      bookName: DataTypes.STRING,
      description: DataTypes.TEXT,
      discountPrice: DataTypes.DECIMAL(10, 2),
      bookImage: DataTypes.TEXT,
      author: DataTypes.STRING,
      quantity: DataTypes.INTEGER,
      price: DataTypes.DECIMAL(10, 2),
      userId: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'book'
    }
  );
  return book;
};
