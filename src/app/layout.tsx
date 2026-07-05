import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SUB SAHARA FABRICS AND FASHION",
  description: "Luxury fashion collection. Sophistication in every design.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
