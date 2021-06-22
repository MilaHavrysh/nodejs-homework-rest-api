const Mailgen = require("mailgen");
require("dotenv").config();

class EmailService {
  constructor(env, sender) {
    this.sender = sender;
    switch (env) {
      case "development":
        this.link = "http://localhost:3000";
        break;
      case "production":
        this.link = "link for production";
        break;
      default:
        this.link = "http://localhost:3000";
        break;
    }
  }

  createTemplateVerifyEmail(token) {
    const mailGenerator = new Mailgen({
      theme: "neopolitan",
      product: {
        name: "System Contacts",
        link: this.link,
      },
    });

    const email = {
      body: {
        intro:
          "Welcome to System Contacts! We're very excited to have you on board.",
        action: {
          instructions: "To get started with Mailgen, please click here:",
          button: {
            color: "#22BC66",
            text: "Confirm your account",
            link: `${this.link}/api/users/verify/${token}`,
          },
        },
      },
    };
    return mailGenerator.generate(email);
  }

  async sendVerifyPassportEmail(token, email) {
    const emailBody = this.createTemplateVerifyEmail(token);
    const result = await this.sender.send({
      to: email,
      subject: "Verify your account",
      html: emailBody,
    });
    console.log(result);
  }
}

module.exports = EmailService;
