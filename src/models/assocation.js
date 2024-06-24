import sequelize, { DataTypes } from '../config/database';

const User = require('./user')(sequelize, DataTypes);
const Book = require('./book')(sequelize, DataTypes);
const Wishlist = require('./wishlist')(sequelize, DataTypes);
const Cart = require('./cart')(sequelize, DataTypes);
const Address = require('./address')(sequelize, DataTypes);


User.hasMany(Book, { foreignKey: 'userId' });
User.hasMany(Cart, { foreignKey: 'userId' });
User.hasMany(Wishlist, { foreignKey: 'userId' });
User.hasMany(Address, { foreignKey: 'userId' });


Book.hasMany(Cart, { foreignKey: 'bookId' });
Book.hasMany(Wishlist, { foreignKey: 'bookId' });

Cart.belongsTo(User, { foreignKey: 'userId' });
Cart.belongsTo(Book, { foreignKey: 'bookId' });

Wishlist.belongsTo(User, { foreignKey: 'userId' });
Wishlist.belongsTo(Book, { foreignKey: 'bookId' });

Address.belongsTo(User, { foreignKey: 'userId' });

module.exports = { User, Book, Cart, Wishlist ,Address };
