import encUtf8 from 'crypto-js/enc-utf8';
import aes from 'crypto-js/aes';
import dotenv from 'dotenv';

dotenv.config();

export const encryptData = (data) => {
  let encryptedString = aes.encrypt(JSON.stringify(data), process.env.encryptStoreKey);
  encryptedString = encryptedString.toString();
  return encryptedString;
};

export const decryptData = (encryptedString) => {
  try {
    const decryptedString = aes.decrypt(encryptedString.toString(), process.env.encryptStoreKey);
    const decryptedObject = JSON.parse(decryptedString.toString(encUtf8));
    return decryptedObject;
  } catch (error) {
    throw Error(error);
  }
};
