import { useContext } from "react";
import { UserContext } from "../components/providers/UserProvider";

export const useUser = () => {
  const value = useContext(UserContext);
  return {
    user: value.user,
    session: value.session,
  };
};
