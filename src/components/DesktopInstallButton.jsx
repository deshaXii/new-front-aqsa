import { useEffect, useState } from "react";

export default function DesktopInstallButton({ className = "" }) {
  const [canInstall, setCanInstall] = useState(false);

  useEffect(() => {
    // لو الحدث جه قبل ما الكمبوننت يركّب
    if (window.__deferredInstallPrompt) {
      setCanInstall(true);
    }
    // listen لتغير الحالة
    const onAvail = () => setCanInstall(true);
    const onInstalled = () => setCanInstall(false);
    window.addEventListener("pwa:beforeinstallprompt", onAvail);
    window.addEventListener("pwa:installed", onInstalled);
    return () => {
      window.removeEventListener("pwa:beforeinstallprompt", onAvail);
      window.removeEventListener("pwa:installed", onInstalled);
    };
  }, []);

  if (!canInstall) return null;

  async function doInstall() {
    const evt = window.__deferredInstallPrompt;
    if (!evt) return;
    evt.prompt();
    const choice = await evt.userChoice;
    if (choice.outcome === "accepted") {
      // نجح التثبيت
      window.__deferredInstallPrompt = null;
      setCanInstall(false);
    }
  }

  return (
    <button
      onClick={doInstall}
      className={`px-3 py-2 rounded-xl bg-blue-600 text-white hover:opacity-90 ${className}`}
      title="تثبيت التطبيق على هذا الجهاز"
    >
      تثبيت التطبيق
    </button>
  );
}
