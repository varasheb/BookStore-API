import sequelize, { DataTypes } from '../config/database';

const User = require('./user')(sequelize, DataTypes);
const Book = require('./book')(sequelize, DataTypes);
const Wishlist = require('./wishlist')(sequelize, DataTypes);
const Cart = require('./cart')(sequelize, DataTypes);
const Address = require('./address')(sequelize, DataTypes);
const Order = require('./order')(sequelize, DataTypes);

User.hasMany(Book, { foreignKey: 'userId' });
User.hasMany(Cart, { foreignKey: 'userId' });
User.hasMany(Wishlist, { foreignKey: 'userId' });
User.hasMany(Address, { foreignKey: 'userId' });
User.hasMany(Order, { foreignKey: 'userId' });

Book.hasMany(Cart, { foreignKey: 'bookId' });
Book.hasMany(Wishlist, { foreignKey: 'bookId' });

Cart.hasMany(Order, { foreignKey: 'cartId' });

Address.hasMany(Order, { foreignKey: 'addressId' });

Cart.belongsTo(User, { foreignKey: 'userId' });
Cart.belongsTo(Book, { foreignKey: 'bookId' });

Wishlist.belongsTo(User, { foreignKey: 'userId' });
Wishlist.belongsTo(Book, { foreignKey: 'bookId' });

Address.belongsTo(User, { foreignKey: 'userId' });

Order.belongsTo(User, { foreignKey: 'userId' });
Order.belongsTo(Cart, { foreignKey: 'cartId' });
Order.belongsTo(Address, { foreignKey: 'addressId' });

module.exports = { User, Book, Cart, Wishlist, Address, Order };
