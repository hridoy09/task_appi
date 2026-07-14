"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { postApi } from "@/lib/api";
import { AUTH_COOKIE_NAME, AUTH_USER, ROUTES } from "@/lib/endpoint";


export default function useLoginHandaler() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function LoginHandaler(event) {
    event.preventDefault();
    setError("");

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email")?.trim() || "";
    const password = formData.get("password") || "";

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    setIsLoading(true);
    try {
      const data = await postApi("LOGIN", { email, password });
      const token = data?.token;

      if (!token) {
        throw new Error("Login successful, but no token was returned.");
      }

      const user = data?.user;

      document.cookie = `${AUTH_COOKIE_NAME}=${token}; path=/; max-age=2592000; SameSite=Lax`;

      if (user) {
        document.cookie = `${AUTH_USER}=${encodeURIComponent(JSON.stringify(user))}; path=/; max-age=2592000; SameSite=Lax`;
      }

      router.replace(ROUTES.HOME);
      router.refresh();
    } catch (loginError) {
    
      setError(loginError.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  }

  return { error, isLoading, LoginHandaler };
}
