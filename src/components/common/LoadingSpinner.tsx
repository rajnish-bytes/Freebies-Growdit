// Loading Spinner Component
import '@assets/css/loader.css';

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[400px] py-12">
      <div className="text-center">
        {/* Animated Spinner */}
        <div className="relative mx-auto w-20 h-20 mb-6">
          {/* Outer decorative ring */}
          <div className="absolute inset-0 border-4 border-blue-100/40 rounded-full animate-ping-slow"></div>
          
          {/* Main spinning rings */}
          <div className="absolute inset-2 border-4 border-transparent border-t-blue-600 border-r-purple-600 rounded-full animate-spin"></div>
          <div className="absolute inset-4 border-4 border-transparent border-b-blue-500 border-l-purple-500 rounded-full animate-spin-reverse"></div>
          
          {/* Center dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2.5 h-2.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full animate-pulse"></div>
          </div>
        </div>
        
        {/* Optional loading text */}
        <p className="text-sm text-gray-500 animate-pulse">Loading...</p>
      </div>
    </div>
  );
}
