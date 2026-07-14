"use client";

import { useState } from "react";

import { postApi } from "@/lib/api";

const POST_TYPES = ["text", "photo", "video", "event", "article"];

export default function useFeedHandaler() {
  const [type, setType] = useState("text");
  const [body, setBody] = useState("");
  const [media, setMedia] = useState(null);
  const [eventDate, setEventDate] = useState("");
  const [privacy, setPrivacy] = useState("public");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function selectType(nextType) {
    setType(POST_TYPES.includes(nextType) ? nextType : "text");
  }

  function selectMedia(event) {
    setMedia(event.target.files?.[0] || null);
  }

  function clearMedia() {
    setMedia(null);
    setType("text");
  }

  function resetForm() {
    setType("text");
    setBody("");
    setMedia(null);
    setEventDate("");
    setPrivacy("public");
  }

  async function FeedHandaler(event) {
    event.preventDefault();
    setError("");

    if (!body && !media) {
      setError("Write something or attach media before posting.");
      return;
    }

    const formData = new FormData();
    formData.append("type", type);
    if (body) formData.append("body", body);
    if (media) formData.append("media", media);
    if (eventDate) formData.append("event_date", eventDate);
    if (privacy) formData.append("privacy", privacy);

    setIsLoading(true);

    try {
      await postApi("FEEDS_STORE", formData);
      resetForm();
    } catch (postError) {
     
      setError(postError.message || "Failed to create post");
    } finally {
      setIsLoading(false);
    }
  }

  return {
    type,
    body,
    media,
    eventDate,
    privacy,
    error,
    isLoading,
    setBody,
    setEventDate,
    setPrivacy,
    selectType,
    selectMedia,
    clearMedia,
    FeedHandaler,
  };
}
