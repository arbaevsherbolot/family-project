"use client";

import Image from "next/image";
import React, { Suspense, useState } from "react";
import Modal from "../../../components/ui/modal/Modal.component";
import Upload from "../../../components/ui/upload/Upload.component";
import Button from "../../../components/ui/button/Button.component";
import styles from "./Photos.module.scss";

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

type Image = {
  id: number;
  author: User;
  authorId: number;
  url: string;
  title?: string;
  createdAt: Date;
  updatedAt: Date;
};

interface props {
  session: string;
  images: Image[];
}

export default function PhotosClient({ session, images }: props) {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [selectImageId, setSelectImageId] = useState<number>(0);

  const selectImage = images.find((image) => image.id === selectImageId);

  const handleOpenImage = (id: number) => {
    setSelectImageId(id);
    setIsOpenModal(!isOpenModal);
  };

  return (
    <>
      <div className={styles.page_wrapper}>
        <div className={styles.content}>
          <h2 className={styles.title}>Мои фото</h2>

          <div className={styles.button_wrapper}>
            <Upload
              path="/api/images"
              session={session}
              success_message="Фотография успешно добавлена">
              Загрузить фото
            </Upload>
          </div>

          <div className={styles.images}>
            <Suspense fallback={<div>Loading...</div>}>
              {images.map((image, idx) => (
                <div
                  key={idx}
                  className={styles.image_wrapper}
                  onClick={() => handleOpenImage(image.id)}>
                  <Image
                    src={image.url}
                    alt={image.title ? image.title : "Image"}
                    width={300}
                    height={300}
                    className={styles.image}
                  />
                </div>
              ))}
            </Suspense>
          </div>
        </div>
      </div>

      {selectImage && (
        <Modal open={isOpenModal}>
          <Image
            src={selectImage.url}
            alt={selectImage.title ? selectImage.title : "Image"}
            width={300}
            height={300}
            style={{ width: "100%", height: "100%" }}
          />
        </Modal>
      )}
    </>
  );
}
