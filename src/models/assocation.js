import sequelize, { DataTypes } from '../config/database';

const User = require('./user')(sequelize, DataTypes);
const Book = require('./book')(sequelize, DataTypes);
const Wishlist = require('./wishlist')(sequelize, DataTypes);
const Cart = require('./cart')(sequelize, DataTypes);
const Address = require('./address')(sequelize, DataTypes);
const Order = require('./order')(sequelize, DataTypes);

User.hasMany(Book, { foreignKey: 'userId' });
User.hasOne(Cart, { foreignKey: 'userId' });
User.hasMany(Wishlist, { foreignKey: 'userId' });
User.hasMany(Address, { foreignKey: 'userId' });
User.hasMany(Order, { foreignKey: 'userId' });

Book.belongsTo(User, { foreignKey: 'userId' }); 
Book.hasOne(Wishlist, { foreignKey: 'bookId' });

Cart.belongsTo(User, { foreignKey: 'userId' });

Address.belongsTo(User, { foreignKey: 'userId' });
Address.hasOne(Order, { foreignKey: 'addressId' });

Wishlist.belongsTo(User, { foreignKey: 'userId' });
Wishlist.belongsTo(Book, { foreignKey: 'bookId' });

Order.belongsTo(User, { foreignKey: 'userId' });
Order.belongsTo(Address, { foreignKey: 'addressId' });

module.exports = { User, Book, Cart, Wishlist, Address, Order };
