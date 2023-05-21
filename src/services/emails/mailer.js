import { EMAIL, EMAIL_PASSWORD } from '../config'

const nodemailer = require('nodemailer')

export const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: EMAIL,
    pass: EMAIL_PASSWORD
  }
})
