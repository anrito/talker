import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen">
      <div className="w-full h-screen lg:h-auto lg:w-9/12 p-6 flex items-center justify-center relative">
        <Button
          variant="ghost"
          className="absolute top-4 left-4 flex items-center gap-2 cursor-pointer"
        >
          <ArrowLeft className="h-5 w-5" />
          <Link href="/">უკან</Link>
        </Button>
        {children}
      </div>

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
