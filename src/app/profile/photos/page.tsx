import { Metadata } from "next";
import PhotosClient from "./page.c";

export const metadata: Metadata = {
  title: "Profile | Photos",
};

export default async function Photos() {
  return <PhotosClient />;
}
