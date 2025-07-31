import React from "react";
import usePageTitle from "../hooks/usePageTitle.jsx";

const HomePage = () => {
  usePageTitle("الرئيسية");

  return (
    <div className="text-center py-10">
      <h2 className="text-2xl font-bold mb-4">
        مرحبًا بك في نظام إدارة صيانة الأجهزة
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-300">
        ابدأ باختيار أحد الأقسام من القائمة العلوية.
      </p>
    </div>
  );
};

export default HomePage;
