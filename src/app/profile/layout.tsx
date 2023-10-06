import ProfileLayoutClient from "./layout.c";

interface props {
  children: React.ReactNode;
}

export default async function ProfileLayout({ children }: props) {
  return <ProfileLayoutClient>{children}</ProfileLayoutClient>;
}
