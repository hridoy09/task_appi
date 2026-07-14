"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { postApi } from "@/lib/api";
import { AUTH_COOKIE_NAME, AUTH_USER, ROUTES } from "@/lib/endpoint";


export default function useRegisterHandaler() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function RegisterHandaler(event) {
    event.preventDefault();
    setError("");
    setSuccess("");

    const formData = new FormData(event.currentTarget);
    const firstName = formData.get("first_name") || "";
    const lastName = formData.get("last_name") || "";
    const email = formData.get("email") || "";
    const password = formData.get("password") || "";
    const passwordConfirmation = formData.get("password_confirmation") || "";
    const termsAgree = formData.get("termsAgree");

    if (!firstName || !lastName || !email || !password || !passwordConfirmation) {
      setError("All fields are required.");
      return;
    }

    if (!email) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (password !== passwordConfirmation) {
      setError("Passwords do not match.");
      return;
    }

    if (!termsAgree) {
      setError("Please agree to the terms and conditions.");
      return;
    }

    setIsLoading(true);

    try {
      const data = await postApi("REGISTER", {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        password_confirmation: passwordConfirmation,
        agree: termsAgree,
      });

      console.log(data);

      const token = data?.token;

      if (!token) {
        throw new Error("Login successful, but no token was returned.");
      }

      const user = data?.user;

      document.cookie = `${AUTH_COOKIE_NAME}=${token}; path=/; max-age=2592000; SameSite=Lax`;

      if (user) {
        document.cookie = `${AUTH_USER}=${encodeURIComponent(JSON.stringify(user))}; path=/; max-age=2592000; SameSite=Lax`;
      }



      setSuccess(data?.message);

      router.replace(ROUTES.LOGIN);
      router.refresh();

    } catch (registerError) {
      setError(registerError.message);
    } finally {
      setIsLoading(false);
    }
  }

  return { error, success, isLoading, RegisterHandaler };
}
