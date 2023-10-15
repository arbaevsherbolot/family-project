"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { links } from "../../../data/links";
import { ArbaevsLogoSvg, ArrowSvg } from "../../../assets/svg/index";
import Account from "../../../components/ui/account/Account.component";
import styles from "./Header.module.scss";

type UserRole = "USER" | "ADMIN" | "SUPERADMIN";

type User = {
  id: number;
  createdAt: string;
  updatedAt: string;
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
  user: User | null;
}

export default function Header({ user }: props) {
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const navbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        isOpen &&
        navbarRef.current &&
        !navbarRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  return (
    <>
      <header ref={navbarRef} className={styles.header}>
        <div className={styles.navbar}>
          <div className={styles.left}>
            <Link href="/">
              <ArbaevsLogoSvg className={styles.logo} />
            </Link>

            <div className={styles.links}>
              {links.map((link, i) => (
                <Link
                  key={i}
                  href={link.path}
                  className={
                    pathname === link.path
                      ? `${styles.link} ${styles.active}`
                      : styles.link
                  }>
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div className={styles.right}>{user && <Account user={user} />}</div>

          <div className={styles.burger_menu}>
            <div className={styles.menu_icon}>
              <input
                className={
                  isOpen
                    ? `${styles.button} ${styles.active}`
                    : `${styles.button}`
                }
                type="button"
                onClick={() => setIsOpen(!isOpen)}
              />
              <div>
                <span></span>
                <span></span>
              </div>
            </div>

            <div
              onClick={(e) => e.stopPropagation()}
              className={
                isOpen ? `${styles.menu} ${styles.active}` : `${styles.menu}`
              }>
              {user && <Account user={user} />}

              <div className={styles.links}>
                {links.map((link, i) => (
                  <Link
                    key={i}
                    href={link.path}
                    onClick={() => setIsOpen(!isOpen)}
                    className={
                      pathname === link.path
                        ? `${styles.link} ${styles.active}`
                        : styles.link
                    }>
                    <ArrowSvg className={`${styles.icon} ${styles.arrow}`} />
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
