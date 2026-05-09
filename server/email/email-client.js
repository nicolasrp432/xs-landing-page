import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

const resend = new Resend(process.env.MAIL_PROVIDER_API_KEY);

export default resend;
