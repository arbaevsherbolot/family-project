"use client";

import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { errorNotification } from "@/lib/utils/notification";
import Button from "../../../../components/ui/button/Button.component";
import Logo from "../../../../components/ui/logo/Logo.component";
import styles from "./EditForm.module.scss";

type FormData = {
  firstName: string;
  lastName: string;
  bio?: string;
};

type UserRole = "USER" | "ADMIN" | "SUPERADMIN";

type User = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  isVerified: boolean;
  email: string;
  password: string;
  resetPasswordSecret?: string | null;
  role: UserRole;
  requests: number;
  lastRequest?: Date | null;
  firstName: string | null;
  lastName: string | null;
  bio?: string | null;
  photo?: string | null;
  phone?: string | null;
  refreshToken?: string | null;
};

interface props {
  user: User;
}

export default function EditForm({ user }: props) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isDirty },
  } = useForm<FormData>();

  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmitForm: SubmitHandler<FormData> = async (formData) => {
    setLoading(true);

    try {
      console.log(formData);
    } catch (e) {
      //@ts-ignore
      errorNotification("Что-то пошло не так");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      setValue("firstName", user.firstName || "");
      setValue("lastName", user.lastName || "");
      setValue("bio", user.bio || "");
    }
  }, [user]);

  return (
    <>
      <div className={styles.form_wrapper}>
        <div className={styles.text}>
          <h2 className={styles.title}>Редактировать профиль</h2>

          <p className={styles.desc}>Измените информацию о своем профиле</p>
        </div>

        <Logo
          src={
            user.photo
              ? `${process.env.NEXT_PUBLIC_API_URL}/${user.photo}`
              : "https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
          }
          alt={`${user.firstName} ${user.lastName}`}
          width={120}
          height={120}
        />

        <form className={styles.form} onSubmit={handleSubmit(handleSubmitForm)}>
          <div className={styles.inputs_container}>
            <div className={styles.cupple}>
              <div className={styles.input_container}>
                <span className={styles.label}>Имя</span>

                <input
                  type="text"
                  disabled={loading}
                  className={styles.input}
                  placeholder="Имя"
                  {...register("firstName", {
                    required: "Поле обязательно для заполнения",
                    pattern: {
                      value: /^[А-ЯЁа-яёA-Za-z\s\-]+$/,
                      message: "Пожалуйста, введите корректное имя",
                    },
                    minLength: {
                      value: 2,
                      message: "Имя должно содержать минимум 2 символа",
                    },
                    maxLength: {
                      value: 50,
                      message: "Имя не может содержать более 50 символов",
                    },
                  })}
                />

                {errors.firstName && (
                  <span className={styles.error}>
                    {errors.firstName.message}
                  </span>
                )}
              </div>

              <div className={styles.input_container}>
                <span className={styles.label}>Фамилия</span>

                <input
                  type="text"
                  disabled={loading}
                  className={styles.input}
                  placeholder="Фамилия"
                  {...register("lastName", {
                    required: "Поле обязательно для заполнения",
                    pattern: {
                      value: /^[А-ЯЁа-яёA-Za-z\s\-]+$/,
                      message: "Пожалуйста, введите корректную фамилию",
                    },
                    minLength: {
                      value: 2,
                      message: "Фамилия должно содержать минимум 2 символа",
                    },
                    maxLength: {
                      value: 50,
                      message: "Фамилия не может содержать более 50 символов",
                    },
                  })}
                />

                {errors.lastName && (
                  <span className={styles.error}>
                    {errors.lastName.message}
                  </span>
                )}
              </div>
            </div>

            <div className={styles.input_container}>
              <span className={styles.label}>Биография</span>

              <textarea
                disabled={loading}
                className={`${styles.input} ${styles.textarea}`}
                placeholder="Расскажите о себе"
                {...register("bio", {
                  minLength: {
                    value: 10,
                    message: "Биография должна содержать минимум 10 символов",
                  },
                  maxLength: {
                    value: 1200,
                    message: "Биография не может содержать более 1200 символов",
                  },
                })}
              />

              {errors.bio && (
                <span className={styles.error}>{errors.bio.message}</span>
              )}
            </div>

            <Button type="submit" load={loading} disabled={isDirty}>
              Сохранить
            </Button>
          </div>

          <div className={styles.info}>
            Для сохранения изменений, нажмите "Сохранить"
          </div>
        </form>
      </div>
    </>
  );
}
