"use client";

import { UserProvider } from "./UserProvider";

interface props {
  children: React.ReactNode;
}

export default function Providers({ children }: props) {
  return <UserProvider>{children}</UserProvider>;
}
