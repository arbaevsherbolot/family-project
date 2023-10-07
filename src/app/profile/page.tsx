import type { Metadata } from 'next'
import { useUserData } from "../../hooks/useUserData";
import ProfileClient from "./page.c";

export const metadata: Metadata = {
  title: "Профиль",
};

export default async function Profile() {
  const user = await useUserData();

  if (!user) return null;

  return <ProfileClient user={user} />;
}
