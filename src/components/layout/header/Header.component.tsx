"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { links } from "../../../data/links";
import { ArbaevsLogoSvg } from "../../../assets/svg/index";
import Account from "../../../components/ui/account/Account.component";
import styles from "./Header.module.scss";

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
  user: User | null;
}

export default function Header({ user }: props) {
  const pathname = usePathname();

  return (
    <>
      <header className={styles.header}>
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
        </div>
      </header>
    </>
  );
}
