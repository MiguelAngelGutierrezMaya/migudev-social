import dotenv from 'dotenv';

dotenv.config();

interface EnvConfig {
  WEBHOOK_VERIFY_TOKEN: string;
  API_TOKEN: string;
  BUSINESS_PHONE: string;
  API_VERSION: string;
  PORT: string;
}

const { WEBHOOK_VERIFY_TOKEN, API_TOKEN, BUSINESS_PHONE, API_VERSION, PORT } =
  process.env as unknown as EnvConfig;

export default {
  WEBHOOK_VERIFY_TOKEN,
  API_TOKEN,
  BUSINESS_PHONE,
  API_VERSION,
  PORT,
}; 