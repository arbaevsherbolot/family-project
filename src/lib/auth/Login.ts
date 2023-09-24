import { setCookie } from "cookies-next";
import axios from "axios";

type TLogin = {
  firstName: string;
  password: string;
};

type TLoginResponse = {
  access_token: string;
  refresh_token: string;
};

export async function Login(data: TLogin) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
      {
        withCredentials: true,
        baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
        ...data,
      }
    );
    const responseTokens: TLoginResponse = response.data.tokens;
    const session = responseTokens.access_token;

    let success: boolean = false;

    if (session) {
      success = true;
      setCookie("session", session);
    }

    return {
      success,
    };
  } catch (e) {
    const error = {
      error: true,
      // @ts-ignore
      message: e.response.data.message,
      //@ts-ignore
      statusCode: e.response.data.statusCode,
    };

    throw error;
  }
}
