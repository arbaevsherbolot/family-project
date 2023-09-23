import { Metadata } from "next";
import BlogClient from "./page.c";

export const metadata: Metadata = {
  title: "Google | Blog",
};

export default async function Blog() {
  return <BlogClient />;
}
