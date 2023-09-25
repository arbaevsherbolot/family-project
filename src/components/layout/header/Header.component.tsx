"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { links } from "../../../data/links";
import { ArbaevsLogoSvg } from "../../../assets/svg/index";
import Button from "../../../components/ui/button/Button.component";
import styles from "./Header.module.scss";

export default async function Header() {
  const pathname = usePathname();

  return (
    <>
      <header className={styles.header}>
        <div className={styles.navbar}>
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
      </header>
    </>
  );
}
