import { Metadata } from "next";
import PhotosClient from "./page.c";
import { useUserData } from "../../../hooks/useUserData";
import type { InferGetStaticPropsType, GetStaticProps } from "next";

export const metadata: Metadata = {
  title: "Профиль | Фото",
};

export default async function Photos() {
  const data = await useUserData();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/images`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data?.session}`,
      },
    }
  );
  const images = await response.json();

  if (!data || !data.user || !data.session) return null;

  return <PhotosClient session={data.session} images={images} />;
}
