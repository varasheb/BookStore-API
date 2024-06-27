const { Wishlist, Book } = require('../models/assocation');

//create new wishlist
export const addToWishlist = async (bookId, userId) => {
  const book = await Book.findOne({ where: { id: bookId } });
  if (!book) {
    throw new Error('Book not found');
  }
  const wishlist = await Wishlist.findOne({ where: { userId } });
  if (wishlist) {
    if (wishlist.bookIds.includes(bookId))
      throw new Error('Book is already in the wishlist');
    wishlist.bookIds.push(bookId);
    wishlist.changed('bookIds', true);
    await wishlist.save();
    return wishlist;
  } else {
    const newWishlist = await Wishlist.create({ userId, bookIds: [bookId] });
    return newWishlist;
  }
};

// get all items from wishlist
export const getWishlist = async (userId) => {
  const wishlist = await Wishlist.findOne({ where: { userId } });

  if (!wishlist) {
    throw new Error('Wishlist not found');
  }

  const books = await Book.findAll({
    where: {
      id: wishlist.bookIds
    },
    attributes: [
      'id',
      'bookName',
      'description',
      'author',
      'price',
      'bookImage'
    ]
  });

  return books;
};

// Remove items from wishlist
export const removeWishlist = async (bookId, userId) => {
  const wishlist = await Wishlist.findOne({ where: { userId } });
  if (!wishlist) throw new Error('Wishlist not found');
  const index = wishlist.bookIds.findIndex((id) => id == bookId);

  if (index === -1) {
    throw new Error('Book not found in the wishlist');
  }

  wishlist.bookIds.splice(index, 1);
  wishlist.changed('bookIds', true);
  await wishlist.save();

  return wishlist;
};
