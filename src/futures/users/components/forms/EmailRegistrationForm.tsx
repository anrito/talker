"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useActionState } from "react";
import { registrationAction } from "@/futures/users/server/actions/AuthentificationActions";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function EmailRegistrationForm() {
  const [state, registrationFormAction] = useActionState(
    registrationAction,
    undefined
  );

  return (
    <form action={registrationFormAction}>
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        {/* <AlertTitle>Error</AlertTitle> */}
        <AlertDescription>
          <ul>
            {state?.errors &&
              Object.entries(state.errors).map(([key, error]) => (
                <li key={key}>{error}</li>
              ))}
          </ul>
        </AlertDescription>
      </Alert>

      <div className="grid w-full items-center gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="firstName" className="mb-2 text-md">
              სახელი
            </Label>
            <Input
              id="firstName"
              name="firstName"
              className="h-14 rounded-xl"
              type="text"
              defaultValue={state?.values?.firstName as string}
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="lastName" className="mb-2 text-md">
              გვარი
            </Label>
            <Input
              id="lastName"
              name="lastName"
              className="h-14 rounded-xl"
              defaultValue={state?.values?.lastName as string}
            />
          </div>
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="email" className="mb-2 text-md">
            ელ.ფოსტა
          </Label>
          <Input
            id="email"
            name="email"
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
            name="password"
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
        <Button
          type="submit"
          className="w-full h-14 rounded-4xl font-bold text-md cursor-pointer"
        >
          რეგისტრაცია
        </Button>
      </div>
    </form>
  );
}
