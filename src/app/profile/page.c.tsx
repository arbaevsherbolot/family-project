"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import styles from "./Profile.module.scss";

export default function ProfileClient() {
  const { data } = useSession();
  const user = data?.user;

  if (!user) {
    return null;
  }

  return (
    <>
      <div className={styles.page_wrapper}>
        <div className={styles.profile_wrapper}>
          <div className={styles.user}>
            <div className={styles.image_wrapper}>
              <Image
                src={
                  user.photo
                    ? `${process.env.NEXT_PUBLIC_API_URL}/${user.photo}`
                    : "https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
                }
                alt={`${user.firstName} ${user.lastName}`}
                width={120}
                height={120}
                className={styles.img}
              />
            </div>

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
