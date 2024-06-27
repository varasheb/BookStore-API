const { Address, User } = require('../models/assocation');

// create new Address
export const newAddress = async (body) => {
  const userId = body.userId;
  const newAddress = {
    type: body.addressType,
    addressLine1: body.addressLine1,
    addressLine2: body.addressLine2,
    city: body.city,
    state: body.state,
    postalCode: body.postalCode,
    country: body.country
  };

  const addressRecord = await Address.findOne({ where: { userId } });

  if (!addressRecord) {
    const user = await User.findOne({ where: { id: userId } });
    if (!user) throw new Error('User not found');
    const newRecord = await Address.create({
      userId,
      fullName: user.name,
      mobile: user.mobile,
      addresses: [newAddress]
    });
    return newRecord;
  } else {
    const existingAddresses = addressRecord.addresses || [];
    if (existingAddresses.length >= 3) {
      throw new Error('User can only have 3 addresses');
    }
    const existingAddressOfType = existingAddresses.find(
      (address) => address.type === body.addressType
    );
    if (existingAddressOfType)
      throw new Error(
        `User already has an address of type ${body.addressType}`
      );

    existingAddresses.push(newAddress);
    addressRecord.addresses = existingAddresses;
    addressRecord.changed('addresses', true);
    await addressRecord.save();
    return addressRecord;
  }
};

// get all Address
export const getAddress = async (userId) => {
  const addresses = await Address.findOne({ where: { userId } });
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

// Update Address
export const updateAddress = async (addressId, userId, updateBody) => {
  const address = await Address.findOne({ where: { id: addressId, userId } });
  if (!address) throw new Error('Address not found');
  const existingAddresses = address.addresses || [];
  const existingAddressOfType = existingAddresses.find(
    (address) => address.type === updateBody.addressType
  );
  if (!existingAddressOfType) {
    throw new Error(`Address of type ${updateBody.addressType} not found`);
  }
  existingAddressOfType.addressLine1 =
    updateBody.addressLine1 || existingAddressOfType.addressLine1;
  existingAddressOfType.addressLine2 =
    updateBody.addressLine2 || existingAddressOfType.addressLine2;
  existingAddressOfType.city = updateBody.city || existingAddressOfType.city;
  existingAddressOfType.state = updateBody.state || existingAddressOfType.state;
  existingAddressOfType.postalCode =
    updateBody.postalCode || existingAddressOfType.postalCode;
  existingAddressOfType.country =
    updateBody.country || existingAddressOfType.country;

  address.changed('addresses', true);
  await address.save();
  return address;
};
