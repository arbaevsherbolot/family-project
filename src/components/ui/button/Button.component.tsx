"use client";

import { useRouter } from "next/navigation";
import { LoadSvg } from "../../../assets/svg";
import styles from "./Button.module.scss";

interface props {
  children: React.ReactNode;
  style?: keyof TStyles;
  type: keyof TTypes;
  load: boolean;
  onClick?: () => void;
  redirect?: string;
}

type TStyles = {};

type TTypes = {
  button: string;
  submit: string;
}

export default function Button({
  children,
  style,
  type,
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
          type={type}
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
