"use client";

import React, { useEffect } from "react";

export default function RedirectClient() {
  useEffect(() => {
    window?.location?.assign(window?.location?.href?.split("to=")?.[1] || "/");
  }, []);

  return (
    <>
      <span>Redirecting...</span>
    </>
  );
}
