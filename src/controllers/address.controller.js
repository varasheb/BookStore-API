import HttpStatus from 'http-status-codes';
import * as AddressService from '../services/address.service';

/**
 * Controller to add to Address
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const newAddress = async (req, res) => {
  try {
    const data = await AddressService.newAddress(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'Address added successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: error.message
    });
  }
};

/**
 * Controller to Get a Address
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getAddress = async (req, res) => {
  try {
    const userId = req.body.userId;
    const data = await AddressService.getAddress(userId);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Retervied Address successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: error.message
    });
  }
};

/**
 * Controller to remove a Address
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */

export const removeAddress = async (req, res) => {
  try {
    const userId = req.body.userId;
    const data = await AddressService.removeAddress(userId);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Address removed successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: error.message
    });
  }
};

/**
 * Controller to update a Address
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const updateAddress = async (req, res) => {
  try {
    const userId = req.body.userId;
    const body = req.body;
    const data = await AddressService.updateAddress(userId, body);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Address updated successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: error.message
    });
  }
};
