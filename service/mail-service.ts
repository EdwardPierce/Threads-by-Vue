import * as nodemailer from "nodemailer";

class MailService {
  transporter: any;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMPT_HOST,
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMPT_USER_GMAIL,
        pass: process.env.SMPT_PASSWORD_GMAIL,
      },
    });
  }

  async sendActivationMail(to: string, link: string) {
    await this.transporter.sendMail({
      from: process.env.SMPT_USER_GMAIL,
      to,
      subject: "Activation account on " + process.env.API_URL,
      text: "",
      html: `
        <div>
            <h1>To activate account navigate to link</h1>
            <a href="${link}">${link}</a>
        </div>
      `,
    });
  }
}

// http://localhost:3000/api/auth/registration
export default MailService;
