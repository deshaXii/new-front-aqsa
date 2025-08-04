import React, { useState } from "react";

const DeliveryModal = ({ onClose, onSubmit }) => {
  const [price, setPrice] = useState("");
  const [parts, setParts] = useState([{ name: "", cost: "", source: "" }]);

  const handlePartChange = (index, field, value) => {
    const updatedParts = [...parts];
    updatedParts[index][field] = value;
    setParts(updatedParts);
  };

  const addPart = () => {
    setParts([...parts, { name: "", cost: "", source: "" }]);
  };

  const handleSubmit = () => {
    if (!price) {
      alert("يرجى إدخال سعر الصيانة");
      return;
    }
    onSubmit({
      price: Number(price),
      parts: parts.filter((p) => p.name && p.cost),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md shadow-lg">
        <h2 className="text-lg font-bold mb-4 text-gray-800 dark:text-gray-100">
          إدخال بيانات التسليم
        </h2>
        <div className="mb-3">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
            سعر الصيانة
          </label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border rounded p-2 dark:bg-gray-700 dark:border-gray-600 text-gray-800 dark:text-gray-100"
          />
        </div>

        <div className="mb-3">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
            قطع الغيار
          </label>
          {parts.map((part, idx) => (
            <div key={idx} className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="اسم القطعة"
                value={part.name}
                onChange={(e) => handlePartChange(idx, "name", e.target.value)}
                className="flex-1 border rounded p-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <input
                type="number"
                placeholder="السعر"
                value={part.cost}
                onChange={(e) => handlePartChange(idx, "cost", e.target.value)}
                className="w-24 border rounded p-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <input
                type="text"
                placeholder="المصدر"
                value={part.source}
                onChange={(e) =>
                  handlePartChange(idx, "source", e.target.value)
                }
                className="w-24 border rounded p-2 dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addPart}
            className="text-blue-600 dark:text-blue-400 text-sm mt-1"
          >
            + إضافة قطعة
          </button>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-gray-100"
          >
            إلغاء
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-4 py-2 rounded bg-green-600 text-white"
          >
            حفظ
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeliveryModal;
