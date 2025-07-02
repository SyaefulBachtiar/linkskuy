export default function LoadingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl space-y-6">
        {/* Header skeleton */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center space-x-4 animate-pulse">
            <div className="w-16 h-16 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-full"></div>
            <div className="flex-1 space-y-3">
              <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-full w-3/4"></div>
              <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-full w-1/2"></div>
            </div>
            <div className="w-20 h-8 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-md"></div>
          </div>
        </div>

        {/* Content cards skeleton */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-sm border p-6">
              <div className="animate-pulse space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-200 to-indigo-300 rounded-lg"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-full"></div>
                    <div className="h-2 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-full w-2/3"></div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="h-2 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-full"></div>
                  <div className="h-2 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-full w-5/6"></div>
                  <div className="h-2 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-full w-4/6"></div>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <div className="flex space-x-2">
                    <div className="w-6 h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"></div>
                    <div className="w-6 h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"></div>
                    <div className="w-6 h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"></div>
                  </div>
                  <div className="w-16 h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-md"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom section skeleton */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="animate-pulse space-y-4">
            <div className="flex items-center justify-between">
              <div className="h-5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-full w-1/4"></div>
              <div className="w-20 h-8 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-md"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="h-20 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg"></div>
                  <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-full"></div>
                  <div className="h-2 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-full w-3/4"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Loading indicator */}
        <div className="flex justify-center items-center space-x-2 py-4">
          <div className="w-2 h-2 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-full animate-bounce"></div>
          <div
            className="w-2 h-2 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-full animate-bounce"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="w-2 h-2 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
          <span className="ml-3 text-gray-500 text-sm font-medium">
            Memuat konten...
          </span>
        </div>
      </div>
    </div>
  );
}
