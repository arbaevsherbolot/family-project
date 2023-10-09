import type { Metadata } from "next";
import { useUserData } from "../../hooks/useUserData";
import ProfileClient from "./page.c";

export const metadata: Metadata = {
  title: "Профиль",
};

export default async function Profile() {
  const data = await useUserData();

  if (!data || !data.user || !data.session) return null;

  return <ProfileClient user={data.user} session={data.session} />;
}
