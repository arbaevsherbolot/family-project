"use client";

import React, { Suspense } from "react";
import { posts } from "../../data/posts";
import Post from "./_components/post/Post.component";
import styles from "./page.module.scss";

export default function BlogClient() {
  return (
    <>
      <div className={styles.page_wrapper}>
        <div className={styles.posts_container}>
          {posts.map((post) => (
            <Suspense key={post.id} fallback={<div>loading</div>}>
              <Post post={post} />
            </Suspense>
          ))}
        </div>
      </div>
    </>
  );
}
