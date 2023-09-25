import { authOptions } from "../lib/auth/auth";
import { getServerSession } from "next-auth";

type Tokens = {
  access_token: string;
  refresh_token: string;
};

export const useUserSession = async () => {
  const session = await getServerSession(authOptions);
  const tokens: Tokens = {
    access_token: `${session?.tokens.access_token}`,
    refresh_token: `${session?.tokens.refresh_token}`,
  };

  if (session) return tokens;
};
