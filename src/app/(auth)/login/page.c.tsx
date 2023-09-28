"use client";

import LoginForm from "../_components/form/LoginForm.component";
import styles from "../Auth.module.scss";

export default function LoginClient() {
  return (
    <>
      <div className={styles.page_wrapper}>
        <LoginForm />
      </div>
    </>
  );
}
