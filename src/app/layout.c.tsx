"use client";

import Header from "../components/layout/header/Header.component";
import Footer from "../components/layout/footer/Footer.component";
import { Toaster } from "sonner";

type UserRole = "USER" | "ADMIN" | "SUPERADMIN";

type User = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  isVerified: boolean;
  email: string;
  password: string;
  resetPasswordSecret?: string | null;
  role: UserRole;
  requests: number;
  lastRequest?: Date | null;
  firstName: string | null;
  lastName: string | null;
  bio?: string | null;
  photo?: string | null;
  phone?: string | null;
  refreshToken?: string | null;
};

interface props {
  children: React.ReactNode;
  user: User | null;
}

export default function RootLayoutClient({ children, user }: props) {
  return (
    <>
      <Header user={user} />

      <main
        style={{
          width: "100%",
          minHeight: "100vh",
          flex: "1 1 auto",
        }}>
        {children}
        <Toaster richColors />
      </main>

      {/* <Footer /> */}
    </>
  );
}
