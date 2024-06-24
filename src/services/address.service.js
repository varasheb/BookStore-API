const { Address, User } = require('../models/assocation');

// create new Address
export const newAddress = async (body) => {
      const userId=body.userId;
      const user = await User.findByPk(userId);
      if (!user) 
        throw new Error('User not found');
      const existingAddresses = await Address.findAll({ where: { userId } });
      if (existingAddresses.length >= 3) 
        throw new Error('User can only have 3 addresses');
      const existingAddressOfType = existingAddresses.find(address => address.addressType === addressData.addressType);
      if (existingAddressOfType) 
        throw new Error(`User already has an address of type ${addressData.addressType}`);
      const address = await Address.create({addressData});
      return address;
    }

// get all Address
export const getAddress = async (userId) => {
    const addresses = await Address.findAll({ where: { userId } });
    return addresses;
};

// Remove Address
export const removeAddress = async (addressId, userId) => {
      const address = await Address.findOne({ where: { id: addressId, userId } });
      if (!address) {
        throw new Error('Address not found');
      }
      await address.destroy();
      return address;
  };
  
