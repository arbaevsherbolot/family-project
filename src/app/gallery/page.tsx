import { Metadata } from "next";
import GalleryClient from "./page.c";

export const metadata: Metadata = {
  title: "Arbaevs | Gallery",
};

export default async function Gallery() {
  return <GalleryClient />;
}
