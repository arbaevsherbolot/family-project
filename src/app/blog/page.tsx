import { Metadata } from "next";
import BlogClient from "./page.c";

export const metadata: Metadata = {
  title: "Arbaevs | Blog",
};

export default async function Blog() {
  return <BlogClient />;
}
