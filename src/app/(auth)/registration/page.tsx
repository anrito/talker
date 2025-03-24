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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft } from "lucide-react";

export default function Page() {
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
          <span>უკან</span>
        </Button>

        <div className="w-full max-w-lg">
          <Card className="border-0 shadow-none bg-transparent">
            <CardHeader>
              <CardTitle className="text-left text-2xl font-normal">
                რეგისტრაცია
              </CardTitle>
              <CardDescription className="text-left">
                შეიყვანე თქვენი ინფორმაცაის რეგისტრაციისათვის
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                className="w-full mb-6 flex items-center justify-center gap-2 h-14 rounded-4xl cursor-pointer"
                variant="outline"
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                დარეგისტრირდი Google-ით
              </Button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>

              <form>
                <div className="grid w-full items-center gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="firstName" className="mb-2 text-md">
                        სახელი
                      </Label>
                      <Input id="firstName" className="h-14 rounded-xl" />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="lastName" className="mb-2 text-md">
                        გვარი
                      </Label>
                      <Input id="lastName" className="h-14 rounded-xl" />
                    </div>
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="email" className="mb-2 text-md">
                      ელ.ფოსტა
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      className="h-14 rounded-xl"
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="password" className="mb-2 text-md">
                      პაროლი
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="6+ სიმბოლო"
                      className="h-14 rounded-xl"
                    />
                  </div>
                  <div className="flex items-start space-x-2 pt-2">
                    <Checkbox id="terms" />
                    <div className="grid gap-1.5 leading-none">
                      <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        ღილაკის მონიშვნით ვეთანხმები თოქერის გამოყენების{" "}
                        <a href="#" className="text-primary hover:underline">
                          წესებს და პირობებს
                        </a>
                      </label>
                    </div>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button className="w-full h-14 rounded-4xl font-bold text-md">
                რეგისტრაცია
              </Button>
              <p className="text-center text-sm">
                უკვე გაქვს ანგარიში ?{" "}
                <a href="#" className="text-primary hover:underline">
                  გაიარე ავტორიზაცია
                </a>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* Right column - 25% width on desktop, hidden on mobile */}
      <div className="hidden lg:block lg:w-3/12 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center m-1 rounded-2xl"
          style={{
            backgroundImage: "url(/images/auth.webp)",
            backgroundSize: "cover",
          }}
        ></div>
      </div>
    </div>
  );
}
