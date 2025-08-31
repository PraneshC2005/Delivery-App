// import nodemailer from "nodemailer"
// import dotenv from "dotenv"
// dotenv.config()
// const transporter = nodemailer.createTransport({
//   service: "Gmail",
//   port: 587,
//   secure: true, // true for 465, false for other ports
//   auth: {
//     user:process.env.EMAIL,
//     pass:process.env.EMAIL_PASS,
//   },
// });

// const sendMail=async (to,otp)=>{
// await transporter.sendMail({
//     from:`${process.env.EMAIL}`,
//     to,
//     subject: "Reset Your Password",
//     html:`<p>Your OTP for password reset is <b>${otp}</b>. It expires in 5 minutes.</p>`
// })
// }

// export const sendOtpToUser = async (user, otp) => {
  
//   await transporter.sendMail({
//     from:`${process.env.EMAIL}`,
//     to: user.email,
//     subject: "Your Delivery OTP",
//     text: `Hello ${user.fullName}, your delivery OTP is ${otp}. It will expire in 5 minutes.`,
//   });

//   console.log("✅ OTP sent to:", user.email, "OTP:", otp);
// };

// export default sendMail




import dotenv from "dotenv";
import emailjs from "@emailjs/nodejs";

dotenv.config();

// General purpose email sending function
const sendMail = async (to, otp) => {
  try {
    if (!process.env.EMAILJS_SERVICE_ID || !process.env.EMAILJS_TEMPLATE_ID || !process.env.EMAILJS_PUBLIC_KEY || !process.env.EMAILJS_PRIVATE_KEY) {
      throw new Error("EmailJS environment variables are not set");
    }

    const response = await emailjs.send(
      process.env.EMAILJS_SERVICE_ID,
      process.env.EMAILJS_TEMPLATE_ID,
      {
        to_email: to,
        otp: otp,
        app_name: process.env.APP_NAME || "YourApp",
        expiry_time: "5 minutes"
      },
      {
        publicKey: process.env.EMAILJS_PUBLIC_KEY,
        privateKey: process.env.EMAILJS_PRIVATE_KEY
      }
    );

    console.log(`✅ Email sent to ${to}`, response.status, response.text);
  } catch (error) {
    console.error("❌ EmailJS Error:", error?.text || error?.message || error);
    throw error;
  }
};

// OTP email for delivery confirmation
export const sendOtpToUser = async (user, otp) => {
  try {
    const response = await emailjs.send(
      process.env.EMAILJS_SERVICE_ID,
      process.env.EMAILJS_TEMPLATE_ID,
      {
        to_email: user.email,
        otp: otp,
        app_name: process.env.APP_NAME || "DeliveryApp",
        expiry_time: "5 minutes",
        full_name: user.fullName || "Customer"
      },
      {
        publicKey: process.env.EMAILJS_PUBLIC_KEY,
        privateKey: process.env.EMAILJS_PRIVATE_KEY
      }
    );

    console.log(`✅ Delivery OTP sent to: ${user.email}`, "Response:", response.status);
  } catch (error) {
    console.error("❌ EmailJS Delivery OTP Error:", error?.text || error?.message || error);
    throw error;
  }
};

export default sendMail;
