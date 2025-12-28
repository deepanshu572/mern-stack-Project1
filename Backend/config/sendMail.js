import nodemailer from "nodemailer"
// Create a transporter using Ethereal test credentials.
// For production, replace with your actual SMTP server details.
const transporter = nodemailer.createTransport({
  service: "Gmail",
  port: 465,
  secure: true, // Use true for port 465, false for port 587
  auth: {
    user: process.env.Gmail,
    pass: process.env.GMAIL_PASSWORD,
  },
});

// Send an email using async/await
const sendMail = async (to, otp) => {
  const info = await transporter.sendMail({
    from: process.env.Gmail,
    to: to,
    subject: "Reset Your Password",
    html: `<p>Your OTP for Password Reset is <b>${otp}</b>
      it expires in 5 min`, // HTML version of the message
  });
};

export default sendMail