"use client";

import React, { useEffect } from "react";
import { LoadSvg } from "../../assets/svg";
import styles from "./Redirect.module.scss";

export default function RedirectClient() {
  useEffect(() => {
    window?.location?.assign(window?.location?.href?.split("to=")?.[1] || "/");
  }, []);

  return (
    <>
      <div className={styles.page_wrapper}>
        <span className={styles.span}>
          <LoadSvg
            className={styles.load}
            style={{
              fill: "rgba(0, 0, 0, 0.8)",
            }}
          />
          Переадресация...
        </span>
      </div>
    </>
  );
}
