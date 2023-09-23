import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import RootLayoutClient from "./layout.c";
import "./globals.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Google",
};

async function getCookieSession() {
  return cookies().get("session")?.value ?? "";
}

interface props {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: props) {
  const session = await getCookieSession();

  return (
    <html lang="en">
      <body className={inter.className}>
        <RootLayoutClient session={session}>{children}</RootLayoutClient>
      </body>
    </html>
  );
}
