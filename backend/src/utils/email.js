import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST,
  port: Number(process.env.MAILTRAP_PORT),
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },
});

export const sendEmail = async ({ to, subject, text }) => {
  try {
    const info = await transporter.sendMail({
      from: '"AURA Store" <no-reply@aura-store.com>',
      to,
      subject,
      text,
    });

    console.log("✅ Email sent:", info.messageId);

    return info;
  } catch (error) {
    console.error("❌ Email sending failed:", error);
    throw error;
  }
};
