import { useEffect, useState } from "react";

export default function InstallPwaButton({ className = "" }) {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isEligible, setIsEligible] = useState(false);
  const isiOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
  const isStandalone =
    window.matchMedia("(display-mode: standalone)").matches ||
    window.navigator.standalone === true;

  useEffect(() => {
    if (isStandalone) setIsInstalled(true);

    function onBIP(e) {
      // امنع البراوزر من إظهار الـmini-infobar
      e.preventDefault();
      setDeferredPrompt(e);
      setIsEligible(true);
    }
    function onAppInstalled() {
      setIsInstalled(true);
      setDeferredPrompt(null);
      setIsEligible(false);
    }

    window.addEventListener("beforeinstallprompt", onBIP);
    window.addEventListener("appinstalled", onAppInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onBIP);
      window.removeEventListener("appinstalled", onAppInstalled);
    };
  }, [isStandalone]);

  async function handleInstall() {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    // choice.outcome: "accepted" | "dismissed"
    setDeferredPrompt(null);
    setIsEligible(false);
  }

  // لو التطبيق متثبت، نخفي الزر
  if (isInstalled) return null;

  // iOS ما بيدعمش beforeinstallprompt → أرشِد المستخدم لإضافة للشاشة الرئيسية
  if (isiOS && !isStandalone) {
    return (
      <button
        type="button"
        className={`px-3 py-2 rounded-xl bg-amber-500 text-white ${className}`}
        onClick={() =>
          alert(
            "لتثبيت التطبيق على iOS:\n1) اضغط زر المشاركة (المربع + السهم)\n2) اختر: إضافة إلى الشاشة الرئيسية\n3) ثم إضافة"
          )
        }
      >
        تثبيت على iOS
      </button>
    );
  }

  // على كروم/أندرويد/دسكتوب: أظهر الزر لما الحدث جهّزنا
  if (!isEligible) return null;

  return (
    <button
      type="button"
      onClick={handleInstall}
      className={`px-3 py-2 rounded-xl bg-blue-600 text-white hover:opacity-90 ${className}`}
    >
      تثبيت التطبيق
    </button>
  );
}
