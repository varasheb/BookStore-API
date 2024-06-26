import { consume } from '../config/rabbitMq';
import { sendNotification ,sendOrderNotification } from '../utils/sendMail';
import logger from '../config/logger';

async function handleEmailQueue(message) {
  try {
    const data = message;
    await sendNotification(data);
    logger.info(`Email sent to ${data.email}`);
  } catch (error) {
    logger.error(`Failed to send email: ${error.message}`);
  }
}
async function handleOrderEmailQueue(message) {
    try {
      const data = message;
      console.log("=========",data);
      await sendOrderNotification(data);
      logger.info(`Email sent to ${data.email}`);
    } catch (error) {
      logger.error(`Failed to send email: ${error.message}`);
    }
  }

export function startEmailConsumer() {
  consume('User', handleEmailQueue);
  consume('Order', handleOrderEmailQueue);
}