"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { errorNotification } from "../../../lib/utils/notification";
import { menuItems } from "../../../data/account-menu";
import { ArrowSvg, LogoutSvg, LoadSvg, VerifySvg } from "../../../assets/svg";
import styles from "./Account.module.scss";

export default function Account() {
  const { data } = useSession();
  const user = data?.user;

  if (!user) {
    return null;
  }

  const pathname = usePathname();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [isClose, setIsClose] = useState(true);
  const close = isClose ? true : false;

  const accountRef = useRef<HTMLDivElement>(null);

  const handleLogout = async () => {
    setLoading(true);

    try {
      await signOut();
      router.push("/login");
    } catch (e) {
      errorNotification("Ошибка сервера, невозможно выйти из системы");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        accountRef.current &&
        !accountRef.current.contains(event.target as Node)
      ) {
        setIsClose(true);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <>
      <div
        ref={accountRef}
        className={styles.account_container}
        onClick={() => setIsClose(!isClose)}>
        <div className={styles.account_data}>
          <div className={styles.logo}>
            <Image
              src={
                user.photo
                  ? `${process.env.NEXT_PUBLIC_API_URL}/${user.photo}`
                  : "https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
              }
              width={38}
              height={38}
              alt="User"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>

          <div className={styles.user}>
            <h3 className={styles.name}>
              {user.firstName} {user.lastName && user.lastName[0]}
              {user.isVerified && <VerifySvg className={styles.icon} />}
            </h3>
          </div>

          <ArrowSvg
            className={!close ? `${styles.icon} ${styles.active}` : styles.icon}
          />
        </div>

        <div
          onClick={(e) => e.stopPropagation()}
          className={
            !close
              ? `${styles.account_menu} ${styles.active}`
              : styles.account_menu
          }>
          <div className={styles.menu_list}>
            <span className={`${styles.item} ${styles.email}`}>
              {user.email}
            </span>

            {menuItems.map((item, i) => (
              <Link
                key={i}
                href={item.path}
                onClick={() => setIsClose(!isClose)}
                className={
                  pathname === item.path
                    ? `${styles.item} ${styles.active}`
                    : styles.item
                }>
                {item.name}
              </Link>
            ))}
          </div>

          <div className={styles.button} onClick={() => handleLogout()}>
            {loading ? (
              <>
                <LoadSvg style={{ fill: "#ff4747" }} className={styles.load} />
                Выход из системы...
              </>
            ) : (
              <>
                <LogoutSvg className={`${styles.icon} ${styles.menu}`} />
                Выйти
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
