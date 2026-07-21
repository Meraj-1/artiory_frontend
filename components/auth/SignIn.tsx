"use client";
import React, { useState, useEffect } from "react";
import { Londrina_Solid } from "next/font/google";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";


const londrina = Londrina_Solid({
  weight: ["100", "300", "400", "900"],
  subsets: ["latin"],
  display: "swap",
});

export default function SignIn() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get the callback URL from search params or default to home
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  // Redirect if user is already authenticated
  useEffect(() => {
    if (status === 'authenticated' && session) {
      router.push(callbackUrl);
    }
  }, [session, status, router, callbackUrl]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      // When redirect: false next-auth returns an object
      if (res?.error) {
        setError(res.error || "Invalid credentials");
      } else {
        // success -> redirect to home (or use callbackUrl)
        router.push("/");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="-mt-20">
        <div className="mb-6">
          <Image width={120} height={120} src="/Artiory-Logo.svg" alt="Artiory Logo" className="mx-auto" />
        </div>

        <div className="text-center mb-6">
          <h1 className={`text-4xl text-[#2e306a] tracking-[0.2px] font-bold ${londrina.className}`}>
            Sign in to your account
          </h1>
          <p className="text-[#2e306a] text-md mt-2">
            Or{" "}
            <Link href="/auth/signup" className={`text-[#2e306a] font-medium hover:underline ${londrina.className}`}>
              create a new account
            </Link>
          </p>
        </div>

        {/* Google Button */}
        <button
          type="button"
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="w-full max-w-sm flex items-center justify-center gap-3 border rounded-lg py-2 px-4 mb-6 shadow-sm hover:scale-105 transition"
        >
          <Image width={20} height={20} src="https://cdn-icons-png.flaticon.com/128/281/281764.png" alt="Google Icon" />
          <span className="text-[#2e306a] font-medium">Continue with Google</span>
        </button>

        <div className="flex items-center w-full max-w-sm my-4">
          <div className="flex-grow h-px bg-gray-300" />
          <span className={`${londrina.className} mx-3 text-gray-500 text-sm`}>or continue with</span>
          <div className="flex-grow h-px bg-gray-300" />
        </div>

        <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
          {error && <div className="text-red-600 text-sm">{error}</div>}

          <label htmlFor="email" className="text-gray-700 text-sm font-medium mb-1">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              placeholder="Enter your email"
              className="pl-10 border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#00b8a2]"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="text-gray-700 text-sm font-medium mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter your password"
                className="pl-10 pr-10 border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#00b8a2]"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center bg-[#00ba82] text-[#2e306a] py-2 font-medium tracking-[0.1px] cursor-pointer text-lg rounded-lg transition hover:scale-105 duration-200 ease-in-out disabled:opacity-60"
          >
            <span className={`${londrina.className}`}>{loading ? "Signing in..." : "Sign in"}</span>
            <ArrowRight className="ml-2" />
          </button>
        </form>
      </div>
    </section>
  );
}
