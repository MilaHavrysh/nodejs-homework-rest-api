const sgMail = require("@sendgrid/mail");
// const nodemailer = require("nodemailer");
const configFile = require("../config/config");
require("dotenv").config();

class CreateSenderSendgrid {
  async send(msg) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    return await sgMail.send({ ...msg, from: configFile.email.sendgrid });
  }
}

module.exports = {
  CreateSenderSendgrid,
};

/* ---------------------Nodemailer----------------------------------
class CreateSenderNodemailer {
  async send(msg) {
    const config = {
      host: "smtp.meta.ua",
      port: 465,
      secure: true,
      auth: {
        user: configFile.email.nodemailer,
        pass: process.env.PASSWORD,
      },
    };
    console.log(msg);

    const transporter = nodemailer.createTransport(config);
    const emailOptions = {
      ...msg,
      from: configFile.email.nodemailer,
    };

    return await transporter.sendMail(emailOptions);
  }
}
------------------------------------- */
