import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import { google } from 'googleapis';
import logger from '../config/logger';

dotenv.config();

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const refreshToken = process.env.MAIL_REFRESH_TOKEN;
const mail = process.env.MAIL;

// OAuth2 credentials
const OAuth2Client = new google.auth.OAuth2(clientId, clientSecret);

OAuth2Client.setCredentials({
  refresh_token: refreshToken
});

// Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: mail,
    clientId,
    clientSecret,
    refreshToken
  }
});

// Email sending function
async function sendResetPasswordEmail(email, token) {
  const mailOptions = {
    from: mail,
    to: email,
    subject: 'Password Reset',
    html: `<h1>Password Reset</h1>
      <p>Hi!!</p>
      <p>Visit the link to proceed with your password reset</p>
      <p>the token is:${token} </p>
      <a href="http://localhost:3000/api/v1/users/resetPassword">Reset Password</a>
      `
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    logger.info(`Email sent to ${email}`);
    return result;
  } catch (error) {
    logger.error(`Error sending email to ${email}: ${error.message}`);
    throw error;
  }
}

async function sendNotification(data) {
  const mailOptions = {
    from: mail,
    to: data.email,
    subject: 'Registration Successful',
    html: `<h1>Welcome to Our Service</h1>
    <p>Hi ${data.firstName},</p>
    <p>Thank you for registering with us. Your account has been successfully created.</p>`
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    logger.info(`Email sent to ${data.email}`);
    return result;
  } catch (error) {
    logger.error(`Error sending email to ${data.email}: ${error.message}`);
    throw error;
  }
}

async function sendOrderNotification(data) {
  const mailOptions = {
    from: mail,
    to: data.email,
    subject: 'Order Placed Successful',
    html: `<html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f2f2f2;
            color: #333;
          }
          h1 {
            color: #333;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            border: 1px solid #ccc;
            background-color: #fff;
            margin-top: 20px;
          }
          th, td {
            border: 1px solid #ccc;
            padding: 8px;
            text-align: left;
          }
          th {
            background-color: #f0f0f0;
            color: #333;
          }
          tfoot td {
            border-top: 2px solid #333;
          }
          .total-amount {
            background-color: #ffc107; /* Yellow */
            color: #333;
            font-weight: bold;
            text-align: right;
          }
        </style>
      </head>
      <body>
        <h1>Welcome to Our Service</h1>
        <p>Hi ${data.order.fullName},</p>
        <p>Your order details:</p>
        <table>
          <thead>
            <tr>
              <th>Book Name</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            ${data.order.books.map(book => `
              <tr>
                <td>${book.bookName}</td>
                <td>${book.quantity}</td>
                <td>${book.discountPrice}</td>
              </tr>
            `).join('')}
          </tbody>
          <tfoot>
            <tr>
              <td colspan="2" class="total-amount">Total Amount:</td>
              <td class="total-amount">${data.order.totalAmount}</td>
            </tr>
          </tfoot>
        </table>
      </body>
    </html>`
  };
  try {
    const result = await transporter.sendMail(mailOptions);
    logger.info(`Email sent to ${data.email}`);
    return result;
  } catch (error) {
    logger.error(`Error sending email to ${data.email}: ${error.message}`);
    throw error;
  }
}

module.exports = { sendResetPasswordEmail, sendNotification ,sendOrderNotification };
