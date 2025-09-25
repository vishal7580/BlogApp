import {  useState } from "react";

export default function Input(
{ 
 label,
 type = "text",
 placeholder,
 error = '',
 inputClass='',
 labelClass='',
 ...props 
}) 
{

  return (
    <div className="mb-4">
      {label && (
        <label className={`${labelClass} block text-sm font-medium text-gray-700 mb-1`}>
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        className={`${inputClass} w-full px-4 py-2 rounded-lg border shadow-sm 
          focus:outline-none focus:ring-2 focus:border-transparent
          ${error 
            ? "border-red-500 focus:ring-red-500" 
            : "border-gray-300 focus:ring-blue-500"} 
        `}
        {...props}
      />
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
}
