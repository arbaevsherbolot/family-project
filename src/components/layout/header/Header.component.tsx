"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { links } from "../../../data/links";
import { ArbaevsLogoSvg } from "../../../assets/svg/index";
import { useSession } from "next-auth/react";
import Account from "../../../components/ui/account/Account.component";
import Button from "../../../components/ui/button/Button.component";
import styles from "./Header.module.scss";

export default function Header() {
  const pathname = usePathname();

  const { data } = useSession();
  const user = data?.user;

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

          <div className={styles.right}>
            {user ? (
              <Account />
            ) : (
              <Button type="button" load={false} redirect="/login">
                Log In
              </Button>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
