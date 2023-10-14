"use client";

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
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
  success_message: string;
  with_dimensions: boolean;
}

export default function Upload({
  children,
  path,
  session,
  success_message,
  with_dimensions,
}: props) {
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const getImageDimensions = async (
    file: File
  ): Promise<{ width: number; height: number }> => {
    return new Promise((resolve) => {
      const image = new Image();

      image.onload = () => {
        const width = image.width;
        const height = image.height;
        resolve({ width, height });
      };

      image.src = URL.createObjectURL(file);
    });
  };

  const handleUploadPhoto = async () => {
    try {
      if (file) {
        setLoading(true);
        console.log("Uploading");

        const formData = new FormData();
        formData.append("file", file);

        if (with_dimensions) {
          const { width, height } = await getImageDimensions(file);

          formData.append("width", `${width}`);
          formData.append("height", `${height}`);
        }

        const response = await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}${path}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${session}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.data) {
          router.refresh();
          successNotification(success_message);
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
