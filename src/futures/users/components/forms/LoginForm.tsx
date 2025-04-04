"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useActionState } from "react";
import { loginAction } from "@/futures/users/server/actions/LoginAction";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";

export function LoginForm() {
  const [state, loginFormAction] = useActionState(loginAction, undefined);

  return (
    <form action={loginFormAction}>
      {state?.errors && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <ul>
              {Object.entries(state.errors).map(([key, error]) => (
                <li key={key}>{error}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      <div className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="email" className="mb-2 text-md">
            ელ.ფოსტა
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            className="h-14 rounded-xl"
            defaultValue={state?.values?.email as string}
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
            className="h-14 rounded-xl"
          />
        </div>
        <div className="flex justify-end">
          <Link
            href="/forgot-password"
            className="text-sm text-primary hover:underline"
          >
            დაგავიწყდათ პაროლი?
          </Link>
        </div>
        <Button
          type="submit"
          className="w-full h-14 rounded-4xl font-bold text-md cursor-pointer"
        >
          შესვლა
        </Button>
      </div>
    </form>
  );
}
