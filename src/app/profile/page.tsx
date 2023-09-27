import { useUserSession } from "../../hooks/useUserSession";
import ProfileClient from "./page.c";

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
  firstName?: string | null;
  lastName?: string | null;
  bio?: string | null;
  photo?: string | null;
  phone?: string | null;
  refreshToken?: string | null;
};

export default async function Profile() {
  // const tokens = await useUserSession();

  // const response = await fetch(
  //   `${process.env.NEXT_PUBLIC_API_URL}/api/auth/profile`,
  //   {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${tokens?.access_token}`,
  //     },
  //   }
  // );

  // const user: User = await response.json();

  // if (!user) return null;

  return <ProfileClient />;
}
