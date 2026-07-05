import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SUB SAHARA | Image CMS Panel",
  description: "Secure administrative management console for Sub Sahara Fabrics and Fashion clothing images.",
};

export default function CmsRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${geistSans.variable} ${geistMono.variable} min-h-screen antialiased bg-zinc-950 text-white`}>
      {children}
      <Toaster 
        theme="dark" 
        closeButton 
        richColors 
        position="top-right"
        toastOptions={{
          style: {
            background: "#18181b",
            border: "1px solid #27272a",
            color: "#ffffff"
          }
        }}
      />
    </div>
  );
}
