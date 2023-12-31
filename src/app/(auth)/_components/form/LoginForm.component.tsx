"use client";

import React, { useEffect, useState } from "react";
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
  emailOrName: string;
  password: string;
};

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/";

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<FormData>();

  const [loading, setLoading] = useState<boolean>(false);
  const [showInput, setShowInput] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleShowInput = () => {
    setShowInput(true);
  };

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
        router.push(`/redirect?to=${next}`);
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
      setValue("emailOrName", cookieEmail);
    }
  }, [setValue]);

  return (
    <>
      <div className={styles.form_wrapper}>
        <form className={styles.form} onSubmit={handleSubmit(handleSubmitForm)}>
          <div className={styles.title}>Войдите в свой аккаунт</div>

          <div className={styles.inputs_container}>
            <div className={styles.input_container}>
              {/* <span className={styles.label}>Электронная почта</span> */}

              <input
                type="text"
                disabled={loading}
                className={
                  loading ? `${styles.input} ${styles.load}` : styles.input
                }
                placeholder="Электронная почта или имя"
                onFocus={handleShowInput}
                {...register("emailOrName", {
                  required: "Требуется электронная почта или имя",
                  pattern: {
                    value:
                      /^[\p{L}\d]+@[A-Za-z\d.-]+\.[A-Za-z]{2,}$|^[\p{L}\d\s]+$/u,
                    message: "Неверный адрес электронной почты или имя",
                  },
                })}
              />

              {errors.emailOrName && (
                <span className={styles.error}>
                  {errors.emailOrName.message}
                </span>
              )}
            </div>

            <div
              className={styles.input_container}
              style={!showInput ? { display: "none" } : { display: "flex" }}>
              {/* <span className={styles.label}>Пароль</span> */}

              <input
                type="password"
                disabled={loading}
                autoComplete="off"
                className={
                  loading
                    ? `${styles.input} ${styles.load} ${styles.password}`
                    : `${styles.input} ${styles.password}`
                }
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

            <Button type="submit" load={loading} disabled={!isValid}>
              Войти
            </Button>
          </div>

          <div className={styles.info}>
            Для доступа к сайту вам необходимо выполнить вход (авторизоваться)
          </div>
        </form>
      </div>
    </>
  );
}
