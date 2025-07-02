export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
  loading = false,
  className = "",
}) {
  const baseStyle = "px-4 py-2 rounded-md font-medium transition duration-200";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-300 text-gray-800 hover:bg-gray-400",
    danger: "bg-red-600 text-white hover:bg-red-700",
    outline: "border border-gray-400 text-gray-700 hover:bg-gray-100",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        flex
          ${baseStyle}
          ${variants[variant]}
          ${disabled || loading ? "opacity-50 cursor-not-allowed" : ""}
          ${className ? className : ""}
        `}
    >
      {loading && (
        <svg
          class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      {loading ? "Loading..." : children}
    </button>
  );
}
