// Professional Page Loading Component
import '@assets/css/loader.css';

export default function PageLoader() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-primary-50 via-white to-navy-50/30 z-50 flex items-center justify-center">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-navy-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative text-center px-4">
        {/* Logo with Premium Animation */}
        <div className="mb-12 relative">
          
          {/* Logo with smooth float animation */}
          <div className="relative animate-float">
            <img 
              src="/logo.png" 
              alt="Growdit" 
              className="w-32 h-32 md:w-60 md :h-60 mx-auto object-contain drop-shadow-2xl"
            />
          </div>
        </div>
        
        {/* Premium Spinner Ring System */}
        <div className="relative mx-auto w-28 h-28 mb-10">
          {/* Outer decorative pulse rings */}
          <div className="absolute inset-0 border-4 border-primary-200/30 rounded-full animate-ping-slow"></div>
          <div className="absolute inset-2 border-4 border-navy-200/30 rounded-full animate-ping-slower"></div>
          
          {/* Dual rotating rings with gradient */}
          <div className="absolute inset-4 border-[3px] border-transparent border-t-primary-600 border-r-primary-500 rounded-full animate-spin"></div>
          <div className="absolute inset-7 border-[3px] border-transparent border-b-navy-600 border-l-navy-500 rounded-full animate-spin-reverse"></div>
          
          {/* Center pulsing core */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4 h-4 bg-gradient-to-br from-primary-600 to-navy-600 rounded-full animate-pulse shadow-lg"></div>
          </div>
        </div>
        
        {/* Professional Loading Text */}
        <div className="space-y-3">
          <h3 className="text-xl md:text-2xl font-bold text-navy-900">
            Loading
            <span className="inline-flex ml-1">
              <span className="animate-bounce-dot text-primary-600">.</span>
              <span className="animate-bounce-dot text-primary-600 animation-delay-200">.</span>
              <span className="animate-bounce-dot text-primary-600 animation-delay-400">.</span>
            </span>
          </h3>
          <p className="text-sm md:text-base text-gray-600 font-medium">
            Preparing amazing content just for you
          </p>
        </div>
        
        {/* Elegant Progress Bar with Theme Colors */}
        <div className="mt-8 w-64 md:w-80 mx-auto">
          <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden shadow-inner">
            <div className="h-full bg-gradient-to-r from-primary-600 via-primary-500 to-navy-600 rounded-full animate-loading-bar shadow-lg"></div>
          </div>
          <p className="mt-3 text-xs text-gray-500 font-medium">Powered by Growdit</p>
        </div>
      </div>
    </div>
  );
}
