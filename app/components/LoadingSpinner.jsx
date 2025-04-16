"use client";

export default function LoadingSpinner({ className = "" }) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="relative">
        <div className="h-24 w-24 rounded-full border-t-4 border-b-4 border-yellow-400 animate-spin"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <svg
            className="w-12 h-12 text-yellow-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </div>
      </div>
      <p className="text-zinc-400 mt-4">Loading...</p>
    </div>
  );
}
