"use client";

import { useRouter } from "next/navigation";
import { LoadSvg } from "../../assets/svg";
import styles from "./Button.module.scss";

interface props {
  children: React.ReactNode;
  style?: keyof TStyles;
  load: boolean;
  onClick?: () => void;
  redirect?: string;
}

type TStyles = {};

export default function Button({
  children,
  style,
  load,
  onClick,
  redirect,
}: props) {
  const router = useRouter();

  const redirectToPage = (path: string) => {
    if (path === "/login?redirect=/") {
      router.push("/login");
    } else router.push(path);
  };

  return (
    <>
      {!load ? (
        <button
          type="submit"
          onClick={
            onClick ? onClick : () => redirect && redirectToPage(redirect)
          }
          className={
            style ? `${styles.button} ${styles[style]}` : styles.button
          }>
          {children}
        </button>
      ) : (
        <button
          type="submit"
          disabled={true}
          className={
            style
              ? `${styles.button_load} ${styles[style]}`
              : styles.button_load
          }>
          {<LoadSvg className={styles.load} />}
        </button>
      )}
    </>
  );
}
