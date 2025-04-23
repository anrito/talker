import Link from "next/link";

export default async function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white">
      <div className="text-center max-w-xl p-8 rounded-xl shadow-lg bg-white">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome</h1>
        <p className="text-gray-600 mb-8">
          Your platform for amazing experiences
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/login"
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Log In
          </Link>
          <Link
            href="/registration"
            className="px-6 py-3 bg-white text-blue-600 font-medium rounded-lg border border-blue-600 hover:bg-blue-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Register
          </Link>
          <Link
            href="/room"
            className="px-6 py-3 bg-white text-blue-600 font-medium rounded-lg border border-blue-600 hover:bg-blue-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Room
          </Link>
          <Link
            href="/dashboard"
            className="px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50"
          >
            Dashboard
          </Link>
        </div>

        <div className="mt-8 text-sm text-gray-500">
          <p>
            New to our platform?{" "}
            <Link href="/about" className="text-blue-600 hover:underline">
              Learn more
            </Link>
          </p>
        </div>
      </div>

      <footer className="mt-8 text-center text-gray-500 text-sm">
        <p>© 2025 Your Company. All rights reserved.</p>
      </footer>
    </div>
  );
}
