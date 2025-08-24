import { useState } from "react";
import API from "../lib/api";

// لازم تحوّل VAPID المفتاح العام Uint8Array
function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");
  const rawData = atob(base64);
  const arr = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) arr[i] = rawData.charCodeAt(i);
  return arr;
}

export default function EnablePushButton({ className = "" }) {
  const [state, setState] = useState("idle"); // idle | asking | enabled | blocked | error

  async function enable() {
    try {
      if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
        setState("error");
        return;
      }
      setState("asking");
      const reg = await navigator.serviceWorker.ready;
      const vapidPub = import.meta.env.VITE_VAPID_PUBLIC_KEY;
      if (!vapidPub) throw new Error("VAPID public key missing");

      const sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(vapidPub),
      });

      await API.post("/push/subscribe", sub);
      setState("enabled");
    } catch (e) {
      if (Notification.permission === "denied") setState("blocked");
      else setState("error");
    }
  }

  if (state === "enabled") {
    return (
      <span
        className={`px-3 py-2 rounded-xl bg-emerald-600 text-white ${className}`}
      >
        الإشعارات مُفعّلة ✅
      </span>
    );
  }

  return (
    <button
      onClick={enable}
      className={`px-3 py-2 rounded-xl bg-blue-600 text-white ${className}`}
    >
      {state === "asking" ? "جاري التفعيل…" : "تفعيل الإشعارات"}
    </button>
  );
}
