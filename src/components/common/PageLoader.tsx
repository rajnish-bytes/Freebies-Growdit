// Page Loading Component (for full page loads)
import '@assets/css/loader.css';

export default function PageLoader() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-50 via-white to-blue-50/30 z-50 flex items-center justify-center">
      <div className="text-center">
        {/* Logo with Animation */}
        <div className="mb-0 relative">
          {/* Glowing effect behind logo */}
          <div className="absolute inset-0 blur-3xl opacity-30">
            <div className="w-32 h-32 mx-auto bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse"></div>
          </div>
          
          {/* Logo Image */}
          <div className="relative animate-bounce-slow">
            <img 
              src="/logo.png" 
              alt="Growdit" 
              className="w-24 h-24 md:size-60 mx-auto object-contain drop-shadow-2xl"
            />
          </div>
        </div>
        
        {/* Animated Spinner Ring */}
        <div className="relative mx-auto w-24 h-24 mb-8">
          {/* Outer decorative rings */}
          <div className="absolute inset-0 border-4 border-blue-100/40 rounded-full animate-ping-slow"></div>
          <div className="absolute inset-2 border-4 border-purple-100/40 rounded-full animate-ping-slower"></div>
          
          {/* Main spinning ring */}
          <div className="absolute inset-4 border-4 border-transparent border-t-blue-600 border-r-purple-600 rounded-full animate-spin"></div>
          <div className="absolute inset-6 border-4 border-transparent border-b-blue-500 border-l-purple-500 rounded-full animate-spin-reverse"></div>
          
          {/* Center dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3 h-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full animate-pulse"></div>
          </div>
        </div>
        
        {/* Loading Text with Dots Animation */}
        <div className="space-y-2">
          <p className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Loading your content
            <span className="inline-flex ml-1">
              <span className="animate-bounce-dot">.</span>
              <span className="animate-bounce-dot animation-delay-200">.</span>
              <span className="animate-bounce-dot animation-delay-400">.</span>
            </span>
          </p>
          <p className="text-sm text-gray-500">Please wait a moment</p>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-6 w-48 h-1 mx-auto bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full animate-loading-bar"></div>
        </div>
      </div>
    </div>
  );
}
