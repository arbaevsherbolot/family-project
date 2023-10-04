import { Metadata } from "next";
import PhotosClient from "./page.c";

export const metadata: Metadata = {
  title: "Профиль | Фото",
};

export default async function Photos() {
  return <PhotosClient />;
}
