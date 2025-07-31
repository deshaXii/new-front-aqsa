import React from "react";
import VoiceInput from "./VoiceInput.jsx";

const InputField = ({
  label,
  icon,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  required,
}) => {
  return (
    <div className="mb-4 input-field relative">
      {label && <label className="block mb-1 font-semibold">{label}</label>}
      <div className="flex items-center border rounded px-3 py-2 bg-white dark:bg-gray-800">
        {icon && <span className="mr-2">{icon}</span>}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className="w-full bg-transparent outline-none"
        />
        <VoiceInput
          onText={(text) => onChange({ target: { name, value: text } })}
        />
      </div>
    </div>
  );
};

export default InputField;
