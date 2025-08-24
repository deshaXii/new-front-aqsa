/// <reference lib="webworker" />
/* eslint-disable no-undef */

// Workbox
import { precacheAndRoute } from "workbox-precaching";
import { registerRoute, setDefaultHandler } from "workbox-routing";
import {
  NetworkFirst,
  StaleWhileRevalidate,
  NetworkOnly,
} from "workbox-strategies";
import { BackgroundSyncPlugin } from "workbox-background-sync";

// لازم السطر ده مع injectManifest
precacheAndRoute(self.__WB_MANIFEST || []);
self.skipWaiting();
self.addEventListener("activate", () => self.clients.claim());

// ===== صفحات HTML: NetworkFirst + fallback للأوفلاين =====
const htmlHandler = new NetworkFirst({
  cacheName: "html-cache",
  networkTimeoutSeconds: 4,
});
registerRoute(
  ({ request }) => request.mode === "navigate",
  async (args) => {
    try {
      return await htmlHandler.handle(args);
    } catch {
      return await caches.match("/offline.html");
    }
  }
);

// ===== الأصول الثابتة: SWR =====
registerRoute(
  ({ request }) =>
    ["style", "script", "font", "image"].includes(request.destination),
  new StaleWhileRevalidate({ cacheName: "assets-cache" })
);

// ===== API GET: NetworkFirst =====
registerRoute(
  ({ url, request }) =>
    request.method === "GET" && /\/api\/.*$/i.test(url.pathname),
  new NetworkFirst({ cacheName: "api-cache", networkTimeoutSeconds: 6 })
);

// ===== Background Sync لطلبات POST/PUT المهمة =====
// ملاحظة: iOS Safari لا يدعم BG Sync — هتتبعت عند فتح الـPWA أونلاين
const postQueue = new BackgroundSyncPlugin("post-queue", {
  maxRetentionTime: 24 * 60,
});
const putQueue = new BackgroundSyncPlugin("put-queue", {
  maxRetentionTime: 24 * 60,
});

registerRoute(
  ({ url, request }) =>
    request.method === "POST" &&
    /\/api\/(repairs|invoices|accounts)/i.test(url.pathname),
  new NetworkOnly({ plugins: [postQueue] }),
  "POST"
);
registerRoute(
  ({ url, request }) =>
    request.method === "PUT" &&
    /\/api\/(repairs|invoices|accounts)/i.test(url.pathname),
  new NetworkOnly({ plugins: [putQueue] }),
  "PUT"
);

// Default handler (احتياطي)
setDefaultHandler(new StaleWhileRevalidate());

// ===== Web Push: عرض الإشعار وفتح الرابط =====
self.addEventListener("push", (event) => {
  let data = {};
  try {
    data = event.data?.json?.() || {};
  } catch {
    /* ignore */
  }
  const title = data.title || "تنبيه";
  const options = {
    body: data.body || "",
    icon: "/icons/icon-192.png",
    badge: "/icons/icon-192.png",
    data: { url: data.url || "/" },
    dir: "rtl",
    lang: "ar",
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = event.notification?.data?.url || "/";
  event.waitUntil(clients.openWindow(url));
});
