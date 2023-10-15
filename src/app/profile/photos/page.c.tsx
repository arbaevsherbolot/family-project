"use client";

import Image from "next/image";
import React, { Suspense, useState } from "react";
import Modal from "../../../components/ui/modal/Modal.component";
import Upload from "../../../components/ui/upload/Upload.component";
import Button from "../../../components/ui/button/Button.component";
import { formatDate } from "../../../lib/utils/format-date";
import { DownloadSvg, ShareSvg, TrashSvg } from "../../../assets/svg";
import styles from "./Photos.module.scss";

type UserRole = "USER" | "ADMIN" | "SUPERADMIN";

type User = {
  id: number;
  createdAt: string;
  updatedAt: string;
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
  title: string;
  width: number;
  height: number;
  createdAt: string;
  updatedAt: string;
};

interface props {
  session: string;
  images: Image[];
}

export default function PhotosClient({ session, images }: props) {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [selectImageId, setSelectImageId] = useState<number>(0);

  const selectImage = images.find((image) => image.id === selectImageId);

  if (selectImage) {
    console.log(selectImage?.url);
  }

  const share = () => {
    if (selectImage) {
      const whatsappURL = `https://wa.me/?text=${encodeURIComponent(
        selectImage?.url
      )}`;

      window.open(whatsappURL);
    }
  };

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
              success_message="Фотография успешно добавлена"
              with_dimensions={true}>
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
                    width={image.width}
                    height={image.height}
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
            width={selectImage.width}
            height={selectImage.height}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "0.25rem",
            }}
          />

          <h2
            style={{
              fontSize: "0.875rem",
              fontWeight: "500",
              color: "rgba(8, 8, 8, 0.426)",
            }}>
            {formatDate(selectImage.createdAt)}
          </h2>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.25rem",
            }}>
            <Button load={false} type="button">
              Скачать
              <DownloadSvg />
            </Button>

            <Button load={false} type="button" style="black" onClick={share}>
              Поделиться
              <ShareSvg
                style={{
                  fill: "#fff",
                }}
              />
            </Button>

            <Button load={false} type="button" style="delete">
              Удалить
              <TrashSvg />
            </Button>
          </div>
        </Modal>
      )}
    </>
  );
}
