import { Metadata } from "next";
import BlogClient from "./page.c";

export const metadata: Metadata = {
  title: "Арбаевы | Блог",
};

export default async function Blog() {
  return <BlogClient />;
}
