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
import { ArrowLeft } from "lucide-react";

export default function Page() {
  const [isResending, setIsResending] = React.useState(false);
  const [resendTimer, setResendTimer] = React.useState(0);

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
    <div className="flex flex-col lg:flex-row w-full min-h-screen">
      {/* Left column - 75% width on desktop, full width on mobile with full height */}
      <div className="w-full h-screen lg:h-auto lg:w-9/12 p-6 flex items-center justify-center relative">
        {/* Back button */}
        <Button
          variant="ghost"
          className="absolute top-4 left-4 flex items-center gap-2 cursor-pointer"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Go back</span>
        </Button>

        <div className="w-full max-w-md">
          <Card className="border-0 shadow-none bg-transparent">
            <CardHeader>
              <CardTitle className="text-left text-lg">
                Create an account
              </CardTitle>
              <CardDescription className="text-left">
                Enter your information to register
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Enter the verification code sent to your email
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
      </div>

      {/* Right column - 25% width on desktop, hidden on mobile */}
      <div className="hidden lg:block lg:w-3/12 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url(https://ui.shadcn.com/placeholder.svg)",
            backgroundSize: "cover",
          }}
        ></div>
      </div>
    </div>
  );
}
