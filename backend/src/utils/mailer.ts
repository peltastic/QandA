import nodemailer, { SendMailOptions } from "nodemailer";
import config from "config";

let transporter = nodemailer.createTransport({
  host: config.get<string>("SMTP_HOST"),
  port: config.get<number>("SMTP_PORT"),
  secure: true,
  auth: {
    user: config.get<string>("SMTP_USER"),
    pass: config.get<string>("SMTP_PASSWORD"),
  },
});

async function sendEmail(payload: SendMailOptions) {
  transporter.sendMail(payload, (error, info) => {
    if (error) {
      console.log(error);
      //   return error
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

export default sendEmail;
