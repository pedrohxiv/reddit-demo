import { Inter } from "next/font/google";

import "@/styles/globals.css";

import { Toaster } from "@/components/providers/Toaster";
import { Navbar } from "@/components/Navbar";
import { cn } from "@/lib/utils";
import Providers from "@/components/Providers";

export const metadata = {
  title: "Reddit",
  description: "",
};

const inter = Inter({ subsets: ["latin"] });

const RootLayout = ({
  children,
  authModal,
}: {
  children: React.ReactNode;
  authModal: React.ReactNode;
}) => {
  return (
    <html
      className={cn(
        "bg-white text-slate-900 antialiased light",
        inter.className
      )}
    >
      <body className="min-h-screen pt-12 bg-slate-50 antialiased">
        <Providers>
          {/* @ts-expect-error Server Component */}
          <Navbar />
          {authModal}
          <div className="container max-w-7xl mx-auto h-full pt-12">
            {children}
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
