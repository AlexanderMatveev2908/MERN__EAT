"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transporterMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
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
exports.transporterMail = nodemailer_1.default.createTransport(Object.assign(Object.assign({}, (process.env.NODE_ENV === "production" ? optProd : optDev)), { auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    } }));
