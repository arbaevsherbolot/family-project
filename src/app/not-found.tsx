import { Metadata } from "next";
import RootNotFoundClient from "./not-found.c";

export const metadata: Metadata = {
  title: "404: Страница не найдена",
};

export default async function RootNotFound() {
  return <RootNotFoundClient />;
}
