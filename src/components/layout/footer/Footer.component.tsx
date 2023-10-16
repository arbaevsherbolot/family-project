"use client";

import styles from "./Footer.module.scss";

interface props {}

export default function Footer({}: props) {
  return (
    <>
      <div className={styles.footer}>
        <div className={styles.text}>
          <h2 className={styles.title}>© Шерболот Арбаев 👨🏻‍💻</h2>

          <p className={styles.desc}>
            все права на сайт защищены и сохраняют за собой авторские права
          </p>
        </div>
      </div>
    </>
  );
}
