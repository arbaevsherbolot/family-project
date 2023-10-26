"use client";

import Image from "next/image";
import React, { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import PhotoModal from "./_components/photo-modal/PhotoModal.component";
import UploadShow from "../../../components/ui/upload/UploadShow.component";
import { formatDate } from "../../../lib/utils/format-date";
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
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedImageId = searchParams.get("photo") || null;
  const selectedImage = images.find((image) =>
    selectedImageId ? image.id === parseInt(selectedImageId) : false
  );

  const handleOpenImage = (id: number) => {
    router.push(`/profile/photos?photo=${id}`);
  };

  return (
    <>
      <div className={styles.page_wrapper}>
        <div className={styles.content}>
          <h2 className={styles.title}>Мои фото</h2>

          <div className={styles.button_wrapper}>
            <UploadShow
              path="/api/images"
              session={session}
              success_message="Фотография успешно добавлена"
              with_dimensions={true}>
              Загрузить фото
            </UploadShow>
          </div>

          <div className={styles.images}>
            {images.map((image, idx) => (
              <div
                key={idx}
                className={styles.image_wrapper}
                onClick={() => handleOpenImage(image.id)}>
                <Suspense fallback={<p>Load</p>}>
                  <Image
                    src={image.url}
                    alt={image.title ? image.title : "Image"}
                    width={image.width}
                    height={image.height}
                    blurDataURL={image.url}
                    className={styles.image}
                  />
                </Suspense>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedImage && (
        <PhotoModal>
          <Image
            src={selectedImage.url}
            alt={selectedImage.title ? selectedImage.title : "Image"}
            width={selectedImage.width}
            height={selectedImage.height}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        </PhotoModal>
      )}
    </>
  );
}
