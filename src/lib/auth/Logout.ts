import { deleteCookie } from "cookies-next";
import axios from "axios";

export async function Logout(session: string) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`,
      {
        withCredentials: true,
        baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
      },
      {
        headers: {
          Authorization: "Bearer " + session,
        },
      }
    );

    deleteCookie("session");

    return response;
  } catch (_) {}
}
