import React from "react";

const PageWrapper = ({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="min-h-screen bg-[#030014] text-white px-6 py-24">

      {/* HEADER */}
      <div className="max-w-6xl mx-auto mb-12">
        <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          {title}
        </h1>

        {subtitle && (
          <p className="text-gray-400 max-w-xl">{subtitle}</p>
        )}
      </div>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto">
        {children}
      </div>
    </div>
  );
};

export default PageWrapper;