"use client";

import Image from "next/image";
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
      <div className={styles.page_wrapper}>
        <div className={styles.profile_wrapper}>
          <div className={styles.user}>
            {user.photo && (
              <div className={styles.image_wrapper}>
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}/${user.photo}`}
                  alt={`${user.firstName} ${user.lastName}`}
                  width={120}
                  height={120}
                  className={styles.img}
                />
              </div>
            )}

            <div className={styles.data}>
              <h2 className={styles.name}>
                {user.firstName} {user.lastName}
              </h2>

              <span className={styles.email}>{user.email}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
