'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class wishlist extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
        
      }
    }
    wishlist.init(
      {
        bookId: DataTypes.INTEGER,
        userId: DataTypes.INTEGER,
  
      },
      {
        sequelize,
        modelName: 'wishlist'
      }
    );
    return wishlist;
  };
