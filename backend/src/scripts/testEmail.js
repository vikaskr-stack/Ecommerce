import "dotenv/config";
import { sendEmail } from "../services/emailService.js";

try {
  const result = await sendEmail({
    to: process.env.EMAIL_FROM,
    subject: "AURA email configuration test",
    html: `
      <h2>Email setup successful!</h2>
      <p>AURA can send emails through Brevo.</p>
    `,
  });

  console.log("Email accepted by SMTP server:", result.messageId);
} catch (error) {
  console.error("Email test failed:", error.message);
}
