"use server";

import sgMail from "@sendgrid/mail";
import env from "@/env";
import { VerificationRequest } from "../requests/VerificationRequest";
import { checkVerificationCodeByEmail } from "../repositories/VerificationRepository";
import { createSession, deleteSession } from "@/lib/session";
import { redirect } from "next/navigation";

sgMail.setApiKey(env.SENDGRID_API);

export async function verificationAction(
  prevState: unknown,
  formData: FormData
) {
  console.log("verificationAction", formData);
  const request = VerificationRequest.safeParse(Object.fromEntries(formData));
  if (!request.success) {
    return {
      errors: request.error.flatten().fieldErrors,
      values: Object.fromEntries(formData),
    };
  }
  // TODO: Get the verification record by email
  const isVerificationCode = await checkVerificationCodeByEmail(
    request.data.email,
    request.data.verificationCode
  );
  if (!isVerificationCode) {
    return {
      errors: {
        verificationCode: ["Verification code is invalid or expired"],
      },
      values: Object.fromEntries(formData),
    };
  }
  // TODO: Authenticate the user
  createSession("1");
  // TODO: Redirect to the dashboard
  redirect("/dashboard");
}

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

export async function logout() {
  await deleteSession();
  redirect("/login");
}
