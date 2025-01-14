import nodemailer from "nodemailer";

// Konfigurasi Nodemailer
export const transporter = nodemailer.createTransport({
  service: "gmail", 
  auth: {
    user: process.env.AUTH_EMAIL, // Email Anda
    pass: process.env.AUTH_PWD, // Password atau App Password email Anda
  },
//   debug: true,
//   logger: true,
});
transporter.verify((error, success) => {
    if (error) {
      console.error("SMTP Connection Error:", error);
    } else {
      console.log("SMTP Connection Success!");
    }
  });

// Fungsi untuk mengirim email
export async function sendEmail(to: string, subject: string, html?: string) {
  return transporter.sendMail({
    from: process.env.AUTH_EMAIL,
    to,
    subject,
    html,
  });
}


// export async function sendEmailFromMitra(from:string,to: string, subject: string, html?: string) {
//   return transporter.sendMail({
//     from,
//     to,
//     subject,
//     html,
//   });
// }