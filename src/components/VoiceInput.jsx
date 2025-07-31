import React, { useState } from "react";

const VoiceInput = ({ onText, lang = "ar-EG" }) => {
  const [listening, setListening] = useState(false);

  const handleVoice = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("المتصفح لا يدعم تحويل الصوت إلى نص");
      return;
    }

    const recognition = new webkitSpeechRecognition(); // eslint-disable-line no-undef
    recognition.lang = lang;
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setListening(true);
    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      onText(transcript);
    };

    recognition.start();
  };

  return (
    <button
      onClick={handleVoice}
      type="button"
      title="تسجيل صوتي"
      className={`ml-2 p-2 rounded ${
        listening ? "bg-green-500" : "bg-gray-300"
      } hover:bg-gray-400`}
    >
      🎤
    </button>
  );
};

export default VoiceInput;
