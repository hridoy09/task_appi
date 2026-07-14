"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { postApi } from "@/lib/api";
import { AUTH_COOKIE_NAME, AUTH_USER, ROUTES } from "@/lib/endpoint";

export default function useLogoutHandaler() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function LogoutHandaler(event) {
    event.preventDefault();
    setIsLoading(true);

    try {
      await postApi("LOGOUT", {});
    } catch {
      console.error("Failed to logout");
    } finally {
      document.cookie = `${AUTH_COOKIE_NAME}=; path=/; max-age=0; SameSite=Lax`;
      document.cookie = `${AUTH_USER}=; path=/; max-age=0; SameSite=Lax`;
      setIsLoading(false);
      router.replace(ROUTES.LOGIN);
      router.refresh();
    }
  }

  return { isLoading, LogoutHandaler };
}
