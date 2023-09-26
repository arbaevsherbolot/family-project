"use client";

import { useEffect, useState } from "react";
import { PostType } from "../../../../data/posts";
import { PointsSvg } from "../../../../assets/svg";
import { menuItems } from "../../../../data/menu";
import Modal from "../../../../components/ui/modal/Modal.component";
import styles from "./Post.module.scss";
import Image from "next/image";

interface props {
  post: PostType;
}

export default function Post({ post }: props) {
  const [openOptions, setOpenOptions] = useState(false);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleOpenOptions = () => {
    setOpenOptions(!openOptions);
  };

  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (openOptions) {
        if (
          !(e.target instanceof HTMLElement) ||
          !e.target.closest(`.${styles.option_menu}`)
        ) {
          setOpenOptions(false);
        }
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [openOptions]);

  return (
    <>
      <div className={styles.post}>
        <div className={styles.content}>
          <div className={styles.head}>
            <div className={styles.author}>
              <div className={styles.logo_wrapper}>
                <Image
                  src={post.author.logo}
                  alt={`${post.author.firstName} ${post.author.lastName}`}
                  width={36}
                  height={36}
                  className={styles.logo}
                />
              </div>

              <span className={styles.fullName}>
                {post.author.firstName} {post.author.lastName}
              </span>
            </div>

            <div
              className={
                openOptions
                  ? `${styles.option} ${styles.active}`
                  : styles.option
              }>
              <PointsSvg
                className={
                  openOptions ? `${styles.icon} ${styles.active}` : styles.icon
                }
                onClick={handleOpenOptions}
              />

              <div className={styles.option_menu}>
                {menuItems.map((item, i) => (
                  <div key={i} className={styles.item}>
                    {item.icon}
                    {item.name}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.cover_wrapper} onClick={handleOpenModal}>
            <Image
              src={post.cover}
              alt={post.title}
              width={500}
              height={500}
              className={styles.cover}
            />
          </div>

          <div className={styles.tags}>
            {post.tags.map((tag, i) => (
              <span key={i} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>

          <div className={styles.text}>
            <h3 className={styles.title} onClick={handleOpenModal}>
              {post.title}
            </h3>

            <p className={styles.desc}>{post.description}</p>
          </div>

          <div className={styles.info}>
            <span className={styles.date}>{post.date}</span>

            <span className={styles.dot}>•</span>

            <span className={styles.to_read}>{post.time} read</span>
          </div>
        </div>
      </div>

      <Modal open={openModal}>
        <div
          className={styles.post}
          style={{
            maxWidth: "100%",
          }}>
          <div className={styles.content}>
            <div className={styles.head}>
              <div className={styles.author}>
                <div
                  className={styles.logo_wrapper}
                  style={{
                    width: "40px",
                    height: "40px",
                  }}>
                  <Image
                    src={post.author.logo}
                    alt={`${post.author.firstName} ${post.author.lastName}`}
                    width={36}
                    height={36}
                    className={styles.logo}
                  />
                </div>

                <span
                  className={styles.fullName}
                  style={{
                    fontSize: "0.955rem",
                  }}>
                  {post.author.firstName} {post.author.lastName}
                </span>
              </div>
            </div>

            <div className={styles.text}>
              <h3 className={styles.title}>{post.title}</h3>

              <div className={styles.info}>
                <span className={styles.date}>{post.date}</span>

                <span className={styles.dot}>•</span>

                <span className={styles.to_read}>{post.time} read</span>
              </div>
            </div>

            <div className={styles.tags}>
              {post.tags.map((tag, i) => (
                <span key={i} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>

            <div
              className={styles.cover_wrapper}
              style={{
                height: "450px",
              }}>
              <Image
                src={post.cover}
                alt={post.title}
                width={800}
                height={500}
                className={styles.cover}
              />
            </div>

            <div className={styles.text}>
              <p className={styles.desc}>{post.description}</p>
            </div>

            <div className={styles.text}>
              <p className={styles.desc}>{post.description}</p>
            </div>

            <div className={styles.text}>
              <p className={styles.desc}>{post.description}</p>
            </div>

            <div
              className={styles.cover_wrapper}
              style={{
                height: "450px",
              }}>
              <Image
                src={post.cover}
                alt={post.title}
                width={800}
                height={500}
                className={styles.cover}
              />
            </div>

            <div className={styles.text}>
              <p className={styles.desc}>{post.description}</p>
            </div>

            <div className={styles.text}>
              <p className={styles.desc}>{post.description}</p>
            </div>

            <div
              className={styles.cover_wrapper}
              style={{
                height: "450px",
              }}>
              <Image
                src={post.cover}
                alt={post.title}
                width={500}
                height={500}
                className={styles.cover}
              />
            </div>

            <div className={styles.text}>
              <p className={styles.desc}>{post.description}</p>
            </div>

            <div className={styles.text}>
              <p className={styles.desc}>{post.description}</p>
            </div>

            <div className={styles.text}>
              <p className={styles.desc}>{post.description}</p>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
