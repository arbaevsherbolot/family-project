"use client";

import styles from "./Profile.module.scss";

type UserRole = "USER" | "ADMIN" | "MODERATOR";

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

interface props {
  user: User;
}

export default function ProfileClient({ user }: props) {
  return (
    <>
      <div className={styles.page_wrapper}>{user.firstName}</div>
    </>
  );
}
