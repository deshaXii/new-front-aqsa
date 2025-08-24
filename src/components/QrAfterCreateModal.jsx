// src/components/QrAfterCreateModal.jsx
import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";

export default function QrAfterCreateModal({
  open,
  onClose,
  trackingUrl,
  repair,
}) {
  const [dataUrl, setDataUrl] = useState("");
  const printRef = useRef(null);

  useEffect(() => {
    if (open && trackingUrl) {
      QRCode.toDataURL(trackingUrl, { margin: 1, width: 256 })
        .then(setDataUrl)
        .catch(() => setDataUrl(""));
    }
  }, [open, trackingUrl]);

  if (!open) return null;

  function copyUrl() {
    navigator.clipboard?.writeText(trackingUrl);
    alert("تم نسخ الرابط");
  }
  function printLabel() {
    const w = window.open("", "_blank", "width=400,height=600");
    const html = `
      <html><head><title>Label</title>
      <style>
       body{font-family:system-ui,-apple-system,Segoe UI,Roboto; padding:8mm;}
       .card{border:1px solid #ddd;border-radius:8px;padding:8px;text-align:center}
       .title{font-weight:700;margin-bottom:6px;font-size:14px}
       .sub{font-size:12px;opacity:.8;margin-bottom:6px}
       img{width:180px;height:180px}
      </style>
      </head><body>
        <div class="card">
          <div class="title">تتبّع صيانة #${repair?.repairId ?? "—"}</div>
          <div class="sub">${repair?.deviceType ?? ""}</div>
          <img src="${dataUrl}" />
          <div style="font-size:11px;margin-top:6px">${trackingUrl}</div>
        </div>
      </body></html>`;
    w.document.write(html);
    w.document.close();
    w.focus();
    w.print();
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 grid place-items-center p-4">
      <div className="w-full max-w-md rounded-2xl bg-white dark:bg-gray-800 p-4 space-y-3 shadow-lg">
        <div className="text-lg font-bold">QR تتبُّع الصيانة</div>
        {dataUrl ? (
          <img
            alt="qr"
            src={dataUrl}
            className="mx-auto w-48 h-48"
            ref={printRef}
          />
        ) : (
          <div className="text-center">جارٍ توليد الكود…</div>
        )}
        <div className="text-xs break-all p-2 rounded bg-gray-50 dark:bg-gray-700/40">
          {trackingUrl}
        </div>
        <div className="flex items-center gap-2 justify-end">
          <button
            className="px-3 py-2 rounded-xl bg-gray-200 dark:bg-gray-700"
            onClick={copyUrl}
          >
            نسخ الرابط
          </button>
          <button
            className="px-3 py-2 rounded-xl bg-emerald-600 text-white"
            onClick={printLabel}
          >
            طباعة ملصق
          </button>
          <button
            className="px-3 py-2 rounded-xl bg-blue-600 text-white"
            onClick={onClose}
          >
            تم
          </button>
        </div>
      </div>
    </div>
  );
}
