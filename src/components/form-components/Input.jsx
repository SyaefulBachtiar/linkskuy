import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function Input({
  label,
  id,
  name,
  type = "text",
  placeholder = "",
  value,
  icon,
  onChange,
  onBlur,
  required = false,
  disabled = false,
  error = "",
  autoComplete = "",
  className = ""
}) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="mb-4 w-full">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-700/20 ">
            {icon}
          </div>
        )}
        <input
          autoComplete={autoComplete}
          id={id}
          name={name}
          type={showPassword ? (type === "password" ? "text" : type) : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          onBlur={onBlur}
          className={`${
            className
              ? className
              : `w-full pl-12 pr-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
            ${error ? "border-red-500" : "border-gray-300"} 
            ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}`
          }`}
        />
        {type === "password" ? (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600/50 hover:text-gray-600/40 transition-colors"
          >
            {showPassword ? (
              <Eye className="w-5 h-5" />
            ) : (
              <EyeOff className="w-5 h-5" />
            )}
          </button>
        ) : (
          ""
        )}
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
