"use client";

import Modal from "../../components/ui/modal/Modal.component";
import EditForm from "./_components/edit-form/EditForm.component";
import Logo from "../../components/ui/logo/Logo.component";
import styles from "./Profile.module.scss";

type UserRole = "USER" | "ADMIN" | "SUPERADMIN";

type User = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  isVerified: boolean;
  email: string;
  password: string;
  resetPasswordSecret?: string | null;
  role: UserRole;
  requests: number;
  lastRequest?: Date | null;
  firstName: string | null;
  lastName: string | null;
  bio?: string | null;
  photo?: string | null;
  phone?: string | null;
  refreshToken?: string | null;
};

interface props {
  user: User;
}

export default function ProfileClient({ user }: props) {
  return (
    <>
      <div className={styles.page_wrapper}>
        <div className={styles.profile_wrapper}>
          <div className={styles.user}>
            <Logo
              src={
                user.photo
                  ? `${process.env.NEXT_PUBLIC_API_URL}/${user.photo}`
                  : "https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
              }
              alt={`${user.firstName} ${user.lastName}`}
              width={120}
              height={120}
            />

            <div className={styles.data}>
              <h2 className={styles.name}>
                {user.firstName} {user.lastName}
              </h2>

              <span className={styles.email}>{user.email}</span>

              <textarea
                disabled
                className={styles.bio}
                value={user.bio ? user.bio : ""}
                readOnly></textarea>
            </div>
          </div>
        </div>

        <Modal open={true}>
          <EditForm user={user} />
        </Modal>
      </div>
    </>
  );
}
