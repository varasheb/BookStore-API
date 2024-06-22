const {Wishlist, Book} = require('../models/assocation');


//create new wishlist
export const addToWishlist = async (bookId, userId) => {

      const book = await Book.findOne({ where: { id: bookId } });
      if (!book) {
        throw new Error('Book not found');
      }
      const existingWishlistItem = await Wishlist.findOne({
        where: { bookId, userId }
      });
      if (existingWishlistItem) 
         throw new Error('Book is already in the wishlist');

      const newWishlistItem = await Wishlist.create({ bookId, userId });
      return newWishlistItem;
    }

// get all items from wishlist
export const getWishlist = async (userId) => {
    const wishlistItems = await Wishlist.findAll({
        where: { userId },
        include: [
          {
            model: Book,
            attributes: ['id', 'bookName', 'description', 'author', 'price', 'bookImage']
          }
        ]
      });
  return wishlistItems
};

// Remove items from wishlist
export const removeWishlist = async (bookId, userId) => {
  const wishlistItem = await Wishlist.findOne({
    where: { bookId, userId }
  });
  if (!wishlistItem)
    throw new Error("Book not found in the wishlist");

  await wishlistItem.destroy();
  return wishlistItem;
};
