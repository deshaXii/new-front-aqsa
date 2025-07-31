import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="text-center py-20">
      <h1 className="text-3xl font-bold mb-4">404 - الصفحة غير موجودة</h1>
      <p className="mb-4">عذرًا، الصفحة التي تبحث عنها غير متوفرة.</p>
      <Link to="/" className="text-blue-500 underline">
        العودة للصفحة الرئيسية
      </Link>
    </div>
  );
};

export default NotFound;
