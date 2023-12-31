"use client";

import Link from "next/link";

import { Icons } from "@/components/Icons";
import { UserAuthForm } from "@/components/UserAuthForm";

interface SignUpProps {
  isModal?: boolean;
}

export const SignUp = ({ isModal }: SignUpProps) => {
  return (
    <div className="container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
      <div className="flex flex-col space-y-2 text-center">
        <Icons.logo className="mx-auto h-6 w-6" />
        <h1 className="text-2xl font-semibold tracking-tight">Sign Up</h1>
        <p className="text-sm max-w-xs mx-auto">
          By continuing, you are setting up a Reddit account and agree to our
          user Agreement and Privacy Policy.
        </p>
        <UserAuthForm />
        <p className="px-8 text-center text-sm text-zinc-700">
          Already a Readdittor?{" "}
          <Link
            href="/sign-in"
            className="hover:text-zinc-800 text-sm underline underline-offset-4"
            replace={isModal}
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};
