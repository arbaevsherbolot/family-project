"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { signOut } from "next-auth/react";
import { errorNotification } from "../../../lib/utils/notification";
import { LoadSvg } from "../../../assets/svg";
import styles from "./Logout.module.scss";

export default function LogoutClient() {
  const router = useRouter();

  useEffect(() => {
    const logout = async () => {
      try {
        await signOut({ redirect: false });
        router.push("/");
      } catch (e) {
        errorNotification("Не удалось выйти из системы");
      }
    };

    logout();
  }, []);

  return (
    <>
      <div className={styles.page_wrapper}>
        <span className={styles.box}>
          <LoadSvg
            className={styles.load}
            style={{
              fill: "rgba(0, 0, 0, 0.8)",
            }}
          />

          <h2 className={styles.title}>Выход из системы...</h2>
        </span>
      </div>
    </>
  );
}
