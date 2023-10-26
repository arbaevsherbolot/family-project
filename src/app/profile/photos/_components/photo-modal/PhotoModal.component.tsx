"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { CloseSvg } from "../../../../../assets/svg";
import styles from "./PhotoModal.module.scss";

interface props {
  children: React.ReactNode;
}

export default function PhotoModal({ children }: props) {
  const router = useRouter();

  const back = () => {
    router.back();
    router.refresh();
  };

  useEffect(() => {
    return () => {
      document.body.classList.add("modal_open");
    };
  }, []);

  return (
    <>
      <div
        className={styles.modal_wrappper}
        onClick={back}>
        <div className={styles.box} onClick={(e) => e.stopPropagation()}>
          <CloseSvg
            className={styles.close}
            style={{
              fill: "#fff",
            }}
            onClick={back}
          />

          <div className={styles.content}>{children}</div>
        </div>
      </div>
    </>
  );
}
