import CryptoJS from 'crypto-js';
import dotenv from 'dotenv';
import logger from '../config/logger';

dotenv.config();

const ekey = process.env.ENCRYPTION_KEY;

export function decryptData(encryptedData) {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, ekey);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return decrypted;
  } catch (error) {
    logger.error(`Decryption error:${error.message}`);
  }
}

export function encryptData(data) {
  const encrypted = CryptoJS.AES.encrypt(data.toString(), ekey).toString();
  return encrypted;
}
