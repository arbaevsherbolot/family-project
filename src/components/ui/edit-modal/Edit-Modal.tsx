'use client';

import { useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Image from 'next/image';
import { editUserInfo, uploadPhoto } from '../../lib/api';
import { errorNotification, successNotification } from '../../lib/notification';
import { CloseSvg, ErrorSvg, ImageSvg, LoadSvg } from '../../assets/svg';
import { useRouter } from 'next/navigation';
import Button from '../button/Button';
import styles from './Edit-Modal.module.scss';

interface props {
  open: boolean;
  session: string;
  user: {
    id: string;
    role: string;
    firstName: string;
    lastName: string;
    photo: string;
    phone?: string;
    email: string;
    bio?: string;
    isVerified: boolean;
    isActive: boolean;
  };
}

interface EditProfile {
  firstName: string;
  lastName: string;
  bio: string;
}

export default function EditModal({ open, session, user }: props) {
  const router = useRouter();

  const [load, setLoad] = useState(false);
  const [loadPhoto, setLoadPhoto] = useState(false);
  const [isClose, setIsClose] = useState(true);
  const close = isClose ? open : !open;

  if (!user) return null;

  const { firstName, lastName, phone, photo, bio } = user;
  const [profilePhoto, setProfilePhoto] = useState(photo);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<EditProfile>();

  const renderProfilePhoto = profilePhoto
    ? `http://localhost:888/${profilePhoto}`
    : 'https://cdn-icons-png.flaticon.com/512/3177/3177440.png';

  const [file, setFile] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUploadPhoto = async () => {
    if (file) {
      setLoadPhoto(true);

      const formData = new FormData();
      formData.append('file', file);

      const response = await uploadPhoto(session, formData);
      setProfilePhoto(response?.data);

      setLoadPhoto(false);
      router.refresh();
      successNotification('Profile photo updated successfully');
    }
  };

  const handleEditUserInfo: SubmitHandler<EditProfile> = async (
    data: EditProfile,
  ) => {
    setLoad(true);

    try {
      await editUserInfo(session, data);

      setLoad(false);
      router.refresh();
      successNotification('Profile info updated successfully');
    } catch (e) {
      setLoad(false);
      //@ts-ignore
      errorNotification(e.message);
    }
  };

  useEffect(() => {
    if (open) {
      setIsClose(true);

      setValue('firstName', firstName);
      setValue('lastName', lastName);
      setValue('bio', bio ? bio : '');
    }
  }, [open]);

  useEffect(() => {
    handleUploadPhoto();
  }, [file]);

  return (
    <>
      <div
        className={
          close
            ? `${styles.modal_wrappper} ${styles.active}`
            : styles.modal_wrappper
        }
        onClick={() => setIsClose(!isClose)}
      >
        <div className={styles.box} onClick={(e) => e.stopPropagation()}>
          <div className={styles.content}>
            <div className={styles.top}>
              <h2 className={styles.title}>Edit profile</h2>

              <button
                className={styles.close_button}
                onClick={() => setIsClose(!isClose)}
              >
                <CloseSvg className={styles.icon} />
              </button>
            </div>

            <div className={styles.logo_wrapper}>
              <div className={styles.edit}>
                <input
                  className={styles.file}
                  type="file"
                  name="file"
                  ref={fileRef}
                  accept="image/*"
                  hidden
                  onChange={(e) => handleChangeFile(e)}
                />

                <ImageSvg
                  className={styles.icon}
                  onClick={() => fileRef.current?.click()}
                />
              </div>

              {!loadPhoto ? (
                <Image
                  className={styles.logo}
                  src={renderProfilePhoto}
                  width={100}
                  height={100}
                  alt="User"
                />
              ) : (
                <LoadSvg className={`${styles.logo} ${styles.load}`} />
              )}
            </div>

            <form
              className={styles.form}
              onSubmit={handleSubmit(handleEditUserInfo)}
            >
              <div className={styles.inputs}>
                <div className={styles.cupple_inputs_container}>
                  <div className={styles.input_wrapper}>
                    <span className={styles.label}>First Name*</span>

                    <div className={styles.input_conainer}>
                      <input
                        type="text"
                        autoComplete="off"
                        placeholder="Sherbolot"
                        className={styles.input}
                        {...register('firstName', {
                          required: 'First name is required',
                          minLength: {
                            value: 2,
                            message: 'First name must be at least 2 characters',
                          },
                          maxLength: {
                            value: 50,
                            message: 'First name cannot exceed 50 characters',
                          },
                        })}
                      />
                    </div>

                    {errors.firstName && (
                      <span className={styles.error}>
                        <ErrorSvg />
                        {errors.firstName.message}
                      </span>
                    )}
                  </div>

                  <div className={styles.input_wrapper}>
                    <span className={styles.label}>Last Name*</span>

                    <div className={styles.input_conainer}>
                      <input
                        type="text"
                        autoComplete="off"
                        placeholder="Arbaev"
                        className={styles.input}
                        {...register('lastName', {
                          required: 'Last name is required',
                          minLength: {
                            value: 2,
                            message: 'Last name must be at least 2 characters',
                          },
                          maxLength: {
                            value: 50,
                            message: 'Last name cannot exceed 50 characters',
                          },
                        })}
                      />
                    </div>

                    {errors.lastName && (
                      <span className={styles.error}>
                        <ErrorSvg />
                        {errors.lastName.message}
                      </span>
                    )}
                  </div>
                </div>

                <div className={styles.input_wrapper}>
                  <span className={styles.label}>BIO</span>

                  <div className={styles.input_conainer}>
                    <textarea
                      className={`${styles.input} ${styles.textarea}`}
                      {...register('bio', {
                        maxLength: {
                          value: 380,
                          message: 'Bio cannot exceed 380 characters',
                        },
                      })}
                    ></textarea>
                  </div>

                  {errors.bio && (
                    <span className={styles.error}>
                      <ErrorSvg />
                      {errors.bio.message}
                    </span>
                  )}
                </div>
              </div>

              <div className={styles.buttons}>
                <Button
                  load={false}
                  style="close"
                  onClick={() => setIsClose(!isClose)}
                >
                  Close
                </Button>

                <Button load={load} style="submit">
                  Save
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
