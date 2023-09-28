"use client";

import React, { useEffect } from "react";
import styles from "./Redirect.module.scss";

export default function RedirectClient() {
  useEffect(() => {
    window?.location?.assign(window?.location?.href?.split("to=")?.[1] || "/");
  }, []);

  return (
    <>
      <div className={styles.page_wrapper}>
        <span className={styles.span}>Переадресация...</span>
      </div>
    </>
  );
}
