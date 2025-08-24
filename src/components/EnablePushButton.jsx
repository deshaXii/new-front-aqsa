import { useEffect, useState } from "react";
import API from "../lib/api";

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const raw = atob(base64);
  const output = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; ++i) output[i] = raw.charCodeAt(i);
  return output;
}

export default function EnablePush({ className = "" }) {
  const [supported, setSupported] = useState(false);
  const [permission, setPermission] = useState(Notification.permission);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setSupported("serviceWorker" in navigator && "PushManager" in window);
  }, []);

  async function enable() {
    if (!supported) return;
    setBusy(true);
    try {
      // 1) اطلب صلاحية
      const perm = await Notification.requestPermission();
      setPermission(perm);
      if (perm !== "granted") return;

      // 2) مفتاح VAPID من السيرفر
      const { data } = await API.get("/notifications/vapid-public-key");
      const publicKey = data?.publicKey;
      if (!publicKey) {
        alert("Push غير مفعّل على السيرفر");
        return;
      }

      // 3) سجل الاشتراك
      const reg = await navigator.serviceWorker.ready;
      const sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicKey),
      });

      // 4) ابعته للسيرفر
      await API.post("/notifications/subscriptions", { subscription: sub });
      alert("تم تفعيل إشعارات الخلفية ✅");
    } catch (e) {
      console.error(e);
      alert("تعذر تفعيل الإشعارات");
    } finally {
      setBusy(false);
    }
  }

  if (!supported) return null;

  return (
    <button
      onClick={enable}
      disabled={busy || permission === "granted"}
      className={`px-3 py-2 rounded-xl ${
        permission === "granted"
          ? "bg-green-600 text-white"
          : "bg-indigo-600 text-white hover:opacity-90"
      } ${className}`}
      title={
        permission === "granted" ? "الإشعارات مفعّلة" : "تفعيل إشعارات الخلفية"
      }
    >
      {permission === "granted" ? "الإشعارات مفعّلة" : "تفعيل الإشعارات"}
    </button>
  );
}
