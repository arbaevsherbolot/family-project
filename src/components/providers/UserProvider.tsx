import { createContext, useMemo, useState, useEffect } from "react";
import { getCookie } from "cookies-next";
import axios from "axios";

interface UserData {
  id: number;
  role: string;
  firstName: string;
  lastName: string;
  photo: string;
  phone?: string;
  email: string;
  bio?: string;
  isVerified: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface Props {
  children: React.ReactNode;
}

interface GetUser {
  user: UserData | null;
  session: string | null;
}

export const UserContext = createContext<GetUser>({
  user: null,
  session: null,
});

export const UserProvider = ({ children }: Props) => {
  const [user, setUser] = useState<UserData | null>(null);
  const session = getCookie("session");

  useEffect(() => {
    if (session) {
      const getUserData = async () => {
        try {
          const response = await axios.get<UserData | null>(
            `${process.env.NEXT_PUBLIC_API_URL}/api/auth/profile`,
            {
              headers: {
                Authorization: "Bearer " + session,
              },
            }
          );

          if (response.data) {
            setUser(response.data);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      getUserData();
    }
  }, [session]);

  const value = useMemo(() => {
    return {
      user: user,
      session: `${session}`,
    };
  }, [user]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
