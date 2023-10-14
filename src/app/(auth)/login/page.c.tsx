"use client";

import LoginForm from "../_components/form/LoginForm.component";
import { ArbaevsLogoSvg } from "../../../assets/svg";
import styles from "../Auth.module.scss";

export default function LoginClient() {
  return (
    <>
      <div className={styles.page_wrapper}>
        <div className={styles.content}>
          <div className={styles.left}>
            <h3 className={styles.title}>Галерея нашей семьи</h3>
          </div>

          <div className={styles.right}>
            <ArbaevsLogoSvg className={styles.logo} />

            <LoginForm />
          </div>
        </div>
      </div>
    </>
  );
}
