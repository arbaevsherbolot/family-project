import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "../components/providers/Providers";
import RootLayoutClient from "./layout.c";
import "./globals.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Arbaevs",
};

interface props {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: props) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <RootLayoutClient>{children}</RootLayoutClient>
        </Providers>
      </body>
    </html>
  );
}
