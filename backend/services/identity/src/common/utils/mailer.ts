import nodemailer from 'nodemailer';

const host = process.env.SMTP_HOST || '';
const port = Number(process.env.SMTP_PORT || 587);
const user = process.env.SMTP_USER || '';
const pass = process.env.SMTP_PASS || '';
const from = process.env.SMTP_FROM || user;

export const transporter = nodemailer.createTransport({
  host,
  port,
  secure: false,
  auth: { user, pass },
});

export async function sendMail(to: string, subject: string, html: string) {
  if (!host || !user || !pass) {
    throw new Error('SMTP is not configured. Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM');
  }
  await transporter.sendMail({ from, to, subject, html });
}
