import dotenv from "dotenv";
dotenv.config();

export default {
  DB_URI: process.env.DB_URI,
  SMTP_PASSWORD: process.env.SMTP_PASSWORD,
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: process.env.SMTP_PORT,
  SMTP_USER: process.env.SMTP_USER,
  ACCESSTOKEN_PRIVATEKEY: process.env.ACCESSTOKEN_PRIVATEKEY,
  ACCESSTOKEN_PUBLICKEY: process.env.ACCESSTOKEN_PRIVATEKEY,
  REFRESHTOKEN_PRIVATEKEY: process.env.REFRESHTOKEN_PRIVATEKEY,
  REFRESHTOKEN_PUBLICKEY: process.env.REFRESHTOKEN_PUBLICKEY
};
