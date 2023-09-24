"use client";

import styles from "../Auth.module.scss";
import LoginForm from "../_components/form/LoginForm.component";

export default function LoginClient() {
  return (
    <>
      <div className={styles.page_wrapper}>
        <LoginForm />
      </div>
    </>
  );
}
