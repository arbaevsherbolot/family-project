"use client";

import styles from "./Footer.module.scss";

interface props {}

export default function Footer({}: props) {
  return (
    <>
      <div className={styles.footer}>© Шерболот Арбаев</div>
    </>
  );
}
