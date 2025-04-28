import dotenv from 'dotenv';

dotenv.config();

interface EnvConfig {
  WEBHOOK_VERIFY_TOKEN: string;
  API_TOKEN: string;
  BUSINESS_PHONE: string;
  API_VERSION: string;
  PORT: string;
  IMAGE_URL: string;
  AUDIO_URL: string;
  PDF_URL: string;
  VIDEO_URL: string;
}

const {
  WEBHOOK_VERIFY_TOKEN,
  API_TOKEN,
  BUSINESS_PHONE,
  API_VERSION,
  PORT,
  IMAGE_URL,
  AUDIO_URL,
  PDF_URL,
  VIDEO_URL,
} = process.env as unknown as EnvConfig;

export default {
  WEBHOOK_VERIFY_TOKEN,
  API_TOKEN,
  BUSINESS_PHONE,
  API_VERSION,
  PORT,
  IMAGE_URL,
  AUDIO_URL,
  PDF_URL,
  VIDEO_URL,
};
