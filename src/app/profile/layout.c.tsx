"use client";

import Sidebar from "./_components/sidebar/Sidebar.component";
import styles from "./Profile.module.scss";

interface props {
  children: React.ReactNode;
}

export default function ProfileLayoutClient({ children }: props) {
  return (
    <>
      <div className={styles.layout_wrapper}>
        <Sidebar />
        {children}
      </div>
    </>
  );
}
