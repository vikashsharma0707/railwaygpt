const nodemailer = require('nodemailer');
const env = require('../config/env');
const logger = require('../config/logger');

let transporter = null;
function getTransport() {
  if (transporter) return transporter;
  if (!env.SMTP_HOST) return null;
  transporter = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    secure: env.SMTP_PORT === 465,
    auth: env.SMTP_USER ? { user: env.SMTP_USER, pass: env.SMTP_PASS } : undefined,
  });
  return transporter;
}

exports.sendMail = async ({ to, subject, html, text, attachments }) => {
  const t = getTransport();
  if (!t) { logger.warn('SMTP not configured — mail skipped: ' + subject); return null; }
  return t.sendMail({ from: env.SMTP_FROM, to, subject, html, text, attachments });
};
