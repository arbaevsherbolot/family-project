"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { useUser } from "../../../hooks/useUser";
import { links } from "../../../data/links";
import { Logout } from "@/lib/auth/Logout";
import { errorNotification } from "../../../lib/utils/notification";
import { ArbaevsLogoSvg } from "../../../assets/svg/index";
import Button from "../../../components/ui/button/Button.component";
import styles from "./Header.module.scss";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, session } = useUser();

  const [loading, setLoading] = useState<boolean>(false);

  console.log({
    user,
    session,
  });

  const logout = async () => {
    setLoading(true);

    try {
      await Logout(`${session}`);
      setLoading(false);
      router.refresh();
    } catch {
      errorNotification("Ошибка при выходе из системы");
    } finally {
      setLoading(false);
    }
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

          {user && (
            <>
              <div className={styles.button_wrapper}>
                <Button type="button" load={loading} onClick={() => logout()}>
                  Выйти
                </Button>
              </div>
            </>
          )}
        </div>
      </header>
    </>
  );
}
