"use client";

import React, { useEffect, useRef, useState } from "react";
import { api } from "../../../lib/api/api";
import {
  errorNotification,
  successNotification,
} from "../../../lib/utils/notification";
import { useRouter } from "next/navigation";
import Button from "../button/Button.component";

interface props {
  children: React.ReactNode;
  path: string;
  session: string;
}

export default function Upload({ children, path, session }: props) {
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUploadPhoto = async () => {
    try {
      if (file) {
        setLoading(true);

        const formData = new FormData();
        formData.append("file", file);

        const response = await api.put(
          `${path}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${session}`,
            },
          }
        );

        if (response.data) {
          router.refresh();
          successNotification("Фото пользователя успешно обновлено");
        }
      }
    } catch (e) {
      errorNotification("Что-то пошло не так");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleUploadPhoto();
  }, [file]);

  return (
    <>
      <input
        type="file"
        name="file"
        ref={fileRef}
        accept="image/*"
        hidden
        onChange={(e) => handleChangeFile(e)}
      />

      <Button
        load={loading}
        type="button"
        style="edit"
        onClick={() => fileRef.current?.click()}>
        {children}
      </Button>
    </>
  );
}
