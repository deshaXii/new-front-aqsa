import { useEffect, useState } from "react";

export default function IosA2hsHint() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent || "";
    const isIOS = /iphone|ipad|ipod/i.test(ua);
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone;
    const isChromeIOS = /CriOS/i.test(ua);
    const isFirefoxIOS = /FxiOS/i.test(ua);
    const isSafari = isIOS && !isChromeIOS && !isFirefoxIOS;

    const dismissed = localStorage.getItem("ios-a2hs-dismissed") === "1";

    if (isIOS && isSafari && !isStandalone && !dismissed) {
      setShow(true);
    }
  }, []);

  if (!show) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      className="fixed bottom-3 left-3 right-3 z-50 rounded-2xl bg-white/95 dark:bg-gray-800/95 backdrop-blur shadow-lg p-3 border border-gray-200 dark:border-gray-700"
    >
      <div className="flex items-start gap-3">
        <div className="text-2xl">📲</div>
        <div className="text-sm">
          <div className="font-semibold mb-1">ثبّت التطبيق على iPhone</div>
          <div className="opacity-80">
            افتح قائمة <span aria-label="زر المشاركة">المشاركة ⬆️</span> ثم اختر
            <b className="mx-1">إضافة إلى الشاشة الرئيسية</b> (Add to Home
            Screen) لتثبيت البرنامج.
          </div>
        </div>
        <button
          onClick={() => {
            localStorage.setItem("ios-a2hs-dismissed", "1");
            const el = document.getElementById("ios-a2hs-hint");
            setTimeout(() => setShow(false), 0);
          }}
          className="ml-auto text-xs px-2 py-1 rounded-lg bg-gray-100 dark:bg-gray-700"
        >
          إخفاء
        </button>
      </div>
    </div>
  );
}
