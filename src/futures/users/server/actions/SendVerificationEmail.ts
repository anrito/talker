"use server";

import sgMail from "@sendgrid/mail";
import env from "@/env";

sgMail.setApiKey(env.SENDGRID_API);

export async function SendVerificationEmail(email: string, code: string) {
  sgMail
    .send({
      to: email,
      from: "no-reply@talker.ge",
      subject: "Sending with SendGrid is Fun",
      text: "this a code to put into your app: " + code,
      html: "<div><strong>code is here html</strong><p>" + code + "</p></div>",
    })
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
}
