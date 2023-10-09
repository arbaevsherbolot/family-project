import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { useUserData } from "../hooks/useUserData";
import Providers from "../components/providers/Providers";
import RootLayoutClient from "./layout.c";
import "./globals.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Арбаевы",
};

interface props {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: props) {
  const data = await useUserData();

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <RootLayoutClient user={data && data.user}>
            {children}
          </RootLayoutClient>
        </Providers>
      </body>
    </html>
  );
}
