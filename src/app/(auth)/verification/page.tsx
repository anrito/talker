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
import { SendVerificationEmail } from "@/futures/users/server/actions/SendVerificationEmail";

export default function Page() {
  const [isResending, setIsResending] = React.useState(false);
  const [resendTimer, setResendTimer] = React.useState(0);
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

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
    <div className="w-full max-w-lg">
      <Card className="border-0 shadow-none bg-transparent">
        <CardHeader>
          <CardTitle className="text-left text-lg">
            გაიარეთ ვერიფიკაცია
          </CardTitle>
          <CardDescription className="text-left">
            შეიყვანეთ ელფოსტაზე გამოგზავნილი კოდი
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-3">
                  ვერიფიკაციის კოდი არასწორია
                </p>
                <div className="w-full">
                  <InputOTP maxLength={6} className="w-full">
                    <InputOTPGroup className="w-full">
                      <InputOTPSlot index={0} className="h-14 w-full text-xl" />
                      <InputOTPSlot index={1} className="h-14 w-full text-xl" />
                      <InputOTPSlot index={2} className="h-14 w-full text-xl" />
                    </InputOTPGroup>
                    <InputOTPSeparator className="mx-1" />
                    <InputOTPGroup className="w-full">
                      <InputOTPSlot index={3} className="h-14 w-full text-xl" />
                      <InputOTPSlot index={4} className="h-14 w-full text-xl" />
                      <InputOTPSlot index={5} className="h-14 w-full text-xl" />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
              </div>

              <div className="text-center">
                <button
                  type="button"
                  onClick={handleResendEmail}
                  disabled={resendTimer > 0 || isResending}
                  className="text-sm text-primary hover:underline disabled:text-muted-foreground disabled:no-underline disabled:cursor-not-allowed"
                >
                  {isResending
                    ? "იგზავნება..."
                    : resendTimer > 0
                    ? `შეგიძლია გააგზავნო ხელახლა ${resendTimer} წამში`
                    : "არ მიგიღია ელ.ფოსტა ? გააგზავნე თავიდან"}
                </button>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button
            onClick={SendVerificationEmail}
            className="w-full h-14 rounded-4xl font-bold text-md cursor-pointer"
          >
            ვერიფიკაცია
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
