"use client";

import React, { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useRef, useState, ReactElement } from "react";
import { signOut } from "next-auth/react";
import { errorNotification } from "../../../lib/utils/notification";
import { menuItems, ItemType } from "../../../data/account-menu";
import Logo from "../logo/Logo.component";
import {
  ArrowSvg,
  LogoutSvg,
  LoadSvg,
  VerifySvg,
  ImagesSvg,
  UserSvg,
} from "../../../assets/svg";
import styles from "./Account.module.scss";

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

type Icons = {
  name: string;
  icon: ReactElement;
};

interface props {
  user: User | null;
}

export default function Account({ user }: props) {
  const pathname = usePathname();
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);
  const [isClose, setIsClose] = useState<boolean>(true);

  const accountRef = useRef<HTMLDivElement>(null);

  const icons: Icons[] = [
    {
      name: "ImagesSvg",
      icon: <ImagesSvg className={`${styles.icon} ${styles.menu}`} />,
    },
    {
      name: "UserSvg",
      icon: <UserSvg className={`${styles.icon} ${styles.menu}`} />,
    },
  ];

  const icon = (item: ItemType) => {
    const foundIcon = icons.find((icon) => item.icon === icon.name);
    return foundIcon ? foundIcon.icon : null;
  };

  const handleLogout = async () => {
    setLoading(true);

    try {
      await signOut();
      router.push("/login");
    } catch (e) {
      errorNotification("Не удалось выйти из системы");
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

  if (!user) return null;

  return (
    <>
      <div
        ref={accountRef}
        className={styles.account_container}
        onClick={() => setIsClose(!isClose)}>
        <div className={styles.account_data}>
          <Logo
            src={
              user.photo
                ? `${process.env.NEXT_PUBLIC_API_URL}/${user.photo}`
                : "https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
            }
            width={38}
            height={38}
            alt={`${user.firstName} ${user.lastName}`}
          />

          <div className={styles.user}>
            <h3 className={styles.name}>
              {user.firstName} {user.lastName && user.lastName[0]}
              {user.isVerified && <VerifySvg className={styles.icon} />}
            </h3>
          </div>

          <ArrowSvg
            className={
              isClose ? `${styles.icon} ${styles.active}` : styles.icon
            }
          />
        </div>

        <div
          onClick={(e) => e.stopPropagation()}
          className={
            !isClose
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
                {icon(item)}
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
