import React from "react";

const InputField = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required,
}) => (
  <div className="mb-4 input-field">
    {label && <label className="block mb-1 font-semibold">{label}</label>}
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-800 outline-none"
    />
  </div>
);

export default InputField;
