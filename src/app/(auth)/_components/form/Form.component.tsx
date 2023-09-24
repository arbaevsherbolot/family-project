"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { getCookie } from "cookies-next";
import { Login } from "../../../../lib/auth/Login";
import {
  errorNotification,
  successNotification,
} from "@/lib/utils/notification";
import Button from "../../../../components/button/Button";
import styles from "./Form.module.scss";

type FormData = {
  firstName: string;
  password: string;
};

export default function Form() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmitForm: SubmitHandler<FormData> = async (data) => {
    setLoading(true);

    try {
      const { success } = await Login(data);

      if (success) {
        successNotification("Успешный вход в систему");
        setLoading(false);
        router.refresh();
      }
    } catch (e) {
      setLoading(false);
      //@ts-ignore
      errorNotification(e.message);
    }
  };

  useEffect(() => {
    const cookieFirstName = getCookie("firstName");

    if (cookieFirstName) {
      setValue("firstName", cookieFirstName);
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
                placeholder="Имя"
                {...register("firstName", {
                  required: "Имя обязательно",
                  maxLength: {
                    value: 50,
                    message: "Имя не может превышать 50 символов",
                  },
                  pattern: {
                    value: /^[a-zA-Zа-яА-Я\s]+$/,
                    message: "Имя может содержать только буквы",
                  },
                })}
              />

              {errors.firstName && (
                <span className={styles.error}>{errors.firstName.message}</span>
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

            <Button load={loading}>Войти</Button>
          </div>

          <div className={styles.desc}>
            Для доступа к сайту вам необходимо выполнить вход (авторизоваться)
          </div>
        </form>
      </div>
    </>
  );
}
