import HttpStatus from 'http-status-codes';
import * as orderService from '../services/order.service';

/**
 * Controller to add to order
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const newOrder = async (req, res) => {
  try {
    const data = await orderService.newOrder(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'order placed successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: error.message
    });
  }
};

/**
 * Controller to Get a order
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getOrder = async (req, res) => {
  try {
    const userId = req.body.userId;
    const data = await orderService.getOrder(userId);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Retervied order successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: error.message
    });
  }
};

/**
 * Controller to remove a order
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */

export const cancelOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const userId = req.body.userId;
    const data = await orderService.cancelOrder(orderId,userId);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'order Cancelled successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: error.message
    });
  }
};


/**
 * Controller to update a order
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const updateOrder = async (req, res) => {
    try {
      const orderId = req.params.id;
      const userId = req.body.userId;
      const body=req.body;
      const data = await orderService.updateOrder(orderId,userId,body);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: 'order updated successfully'
      });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        message: error.message
      });
    }
  };