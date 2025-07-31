import React from "react";
import InputField from "./InputField.jsx";

const PartsInputGroup = ({ parts, setParts }) => {
  const handleChange = (index, field, value) => {
    const updated = [...parts];
    updated[index][field] = field === "cost" ? parseFloat(value) || 0 : value;
    setParts(updated);
  };

  const addPart = () => setParts([...parts, { name: "", source: "", cost: 0 }]);

  const removePart = (index) => {
    const updated = parts.filter((_, i) => i !== index);
    setParts(updated);
  };

  return (
    <div>
      <h4 className="font-bold mb-2">قطع الغيار</h4>
      {parts.map((part, i) => (
        <div key={i} className="mb-4 border p-2 rounded">
          <InputField
            label="اسم القطعة"
            value={part.name}
            onChange={(e) => handleChange(i, "name", e.target.value)}
            placeholder="مثال: شاشة"
          />
          <InputField
            label="المصدر"
            value={part.source}
            onChange={(e) => handleChange(i, "source", e.target.value)}
            placeholder="مثال: محل أحمد"
          />
          <InputField
            label="السعر"
            type="number"
            value={part.cost}
            onChange={(e) => handleChange(i, "cost", e.target.value)}
            placeholder="مثال: 200"
          />
          <button
            type="button"
            onClick={() => removePart(i)}
            className="text-red-500 hover:underline mt-2"
          >
            حذف القطعة
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addPart}
        className="text-blue-500 hover:underline"
      >
        + إضافة قطعة غيار
      </button>
    </div>
  );
};

export default PartsInputGroup;
