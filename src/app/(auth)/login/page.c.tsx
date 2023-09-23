"use client";

import styles from "../Auth.module.scss";
import Form from "../_components/form/Form.component";

export default function LoginClient() {
  return (
    <>
      <div className={styles.page_wrapper}>
        <Form />
      </div>
    </>
  );
}
