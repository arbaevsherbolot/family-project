"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { links } from "../../data/links";
import { useLogout } from "../../lib/auth/useLogout";
import Image from "next/image";
import { ArbaevsLogoSvg } from "../../assets/svg/index";
import styles from "./Header.module.scss";

interface props {
  session: string;
}

export default function Header({ session }: props) {
  const pathname = usePathname();
  const router = useRouter();

  const logout = async () => {
    await useLogout(session);
    router.refresh();
  };

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
