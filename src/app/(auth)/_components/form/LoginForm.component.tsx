"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { getCookie } from "cookies-next";
import {
  errorNotification,
  successNotification,
} from "../../../../lib/utils/notification";
import { signIn } from "next-auth/react";
import Button from "../../../../components/ui/button/Button.component";
import styles from "./Form.module.scss";

type FormData = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmitForm: SubmitHandler<FormData> = async (formData) => {
    setLoading(true);

    const loginData = {
      ...formData,
      redirect: false,
      callbackUrl: next ? next : "/",
    };

    try {
      const response = await signIn("credentials", loginData);

      if (!response?.error) {
        successNotification("Успешный вход в систему");
        router.push(`/redirect?to=${next || "/"}`);
      } else {
        errorNotification(response?.error.replace("Error: ", ""));
      }
    } catch (e) {
      //@ts-ignore
      errorNotification("Что-то пошло не так");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const cookieEmail = getCookie("email");

    if (cookieEmail) {
      setValue("email", cookieEmail);
    }
  }, []);

  return (
    <>
      <div className={styles.form_wrapper}>
        <form className={styles.form} onSubmit={handleSubmit(handleSubmitForm)}>
          <div className={styles.title}>Вход</div>

          <div className={styles.inputs_container}>
            <div className={styles.input_container}>
              <input
                type="text"
                className={styles.input}
                placeholder="Электронная почта"
                {...register("email", {
                  required: "Требуется электронная почта",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Неверный адрес электронной почты",
                  },
                })}
              />

              {errors.email && (
                <span className={styles.error}>{errors.email.message}</span>
              )}
            </div>

            <div className={styles.input_container}>
              <input
                type="password"
                autoComplete="off"
                className={`${styles.input} ${styles.password}`}
                placeholder="Пароль"
                {...register("password", {
                  required: "Пароль обязателен",
                  minLength: {
                    value: 6,
                    message: "Пароль должен содержать как минимум 6 символов",
                  },
                  maxLength: {
                    value: 24,
                    message: "Пароль не может содержать более 24 символов",
                  },
                })}
              />

              {errors.password && (
                <span className={styles.error}>{errors.password.message}</span>
              )}
            </div>

            <Button type="submit" load={loading}>
              Войти
            </Button>
          </div>

          <div className={styles.desc}>
            Для доступа к сайту вам необходимо выполнить вход (авторизоваться)
          </div>
        </form>
      </div>
    </>
  );
}
