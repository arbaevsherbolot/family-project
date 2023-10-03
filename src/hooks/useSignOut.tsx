import { signOut } from "next-auth/react";

export const useSignOut = async () => {
  try {
    await signOut();
  } catch (e) {
    throw new Error("Sign out failed");
  }
};
