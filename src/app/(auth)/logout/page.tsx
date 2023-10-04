import { Metadata } from "next";
import LogoutClient from "./page.c";

export const metadata: Metadata = {
  title: "Выход из системы",
};

export default async function Logout() {
  return <LogoutClient />;
}
