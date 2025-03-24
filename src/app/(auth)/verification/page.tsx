"use client";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSearchParams } from "next/navigation";

import FormData from "form-data"; // form-data v4.0.1
import Mailgun from "mailgun.js"; // mailgun.js v11.1.0

export default function Page() {
  const [isResending, setIsResending] = React.useState(false);
  const [resendTimer, setResendTimer] = React.useState(0);
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  async function sendSimpleMessage() {
    const mailgun = new Mailgun(FormData);
    const mg = mailgun.client({
      username: "api",
      key: process.env.API_KEY || "API_KEY",
      // When you have an EU-domain, you must specify the endpoint:
      // url: "https://api.eu.mailgun.net/v3"
    });
    try {
      const data = await mg.messages.create(
        "sandbox1b3bee34e124410295175bbadbf9290b.mailgun.org",
        {
          from: "Mailgun Sandbox <postmaster@sandbox1b3bee34e124410295175bbadbf9290b.mailgun.org>",
          to: ["Anri Oboladze <admin@talker.ge>"],
          subject: "Hello Anri Oboladze",
          text: "Congratulations Anri Oboladze, you just sent an email with Mailgun! You are truly awesome!",
        }
      );

      console.log(data); // logs response data
    } catch (error) {
      console.log(error); //logs any error
    }
  }

  // Function to handle resend email
  const handleResendEmail = () => {
    if (resendTimer > 0 || isResending) return;

    setIsResending(true);

    // Simulate API call to resend email
    setTimeout(() => {
      setIsResending(false);
      setResendTimer(30); // 30 second cooldown

      // Start countdown
      const interval = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }, 1000);
  };

  return (
    <div className="w-full max-w-md">
      <Card className="border-0 shadow-none bg-transparent">
        <CardHeader>
          <CardTitle className="text-left text-lg">Create an account</CardTitle>
          <CardDescription className="text-left">
            Enter your information to register
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-3">
                  Enter the verification code sent to your email {email}
                </p>
                <InputOTP maxLength={6}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>

              <div className="text-center">
                <button
                  type="button"
                  onClick={handleResendEmail}
                  disabled={resendTimer > 0 || isResending}
                  className="text-sm text-primary hover:underline disabled:text-muted-foreground disabled:no-underline disabled:cursor-not-allowed"
                >
                  {isResending
                    ? "Sending..."
                    : resendTimer > 0
                    ? `Resend email in ${resendTimer}s`
                    : "Didn't receive the code? Resend email"}
                </button>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button className="w-full">Register</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
