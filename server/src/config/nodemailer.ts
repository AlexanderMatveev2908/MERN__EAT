import nodemailer from "nodemailer";

const optDev = {
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  tls: {
    rejectUnauthorized: false,
  },
};

const optProd = {
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  tls: {
    rejectUnauthorized: true,
  },
};

export const transporterMail = nodemailer.createTransport({
  ...(process.env.NODE_ENV === "production" ? optProd : optDev),
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});
