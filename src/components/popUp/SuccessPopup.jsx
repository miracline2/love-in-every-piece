
import React from 'react'
import '../../App.css'

const SuccessPopup = ({ videoSrc, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn p-2 sm:p-4">
      <div className="relative bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 rounded-2xl sm:rounded-3xl shadow-2xl p-2.5 sm:p-4 md:p-5 max-w-4xl w-full max-h-[95vh] animate-scaleIn border-3 sm:border-4 border-pink-300 overflow-hidden">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 sm:top-3 sm:right-3 z-20 bg-white/80 hover:bg-white text-gray-700 hover:text-pink-600 rounded-full p-1.5 shadow-lg transition-all duration-300 hover:scale-110 border-2 border-pink-300 cursor-pointer"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Content - NO SCROLL */}
        <div className="relative z-10 flex flex-col h-full">
          
          {/* Success Header - Compact for Mobile */}
          <div className="text-center mb-1.5 sm:mb-2 md:mb-3 shrink-0">
            <div className="text-xl sm:text-3xl md:text-5xl mb-0.5 sm:mb-1 font-semibold
                        bg-gradient-to-r from-purple-400 via-pink-500 to-rose-500
                        text-transparent bg-clip-text animate-soft-glow">
              Dear Shivu
            </div>

            <h2 className="text-base sm:text-xl md:text-3xl font-bold text-purple-800 mb-0.5 sm:mb-1">
              💕 A love that grew with time 💕
            </h2>

            <p className="text-[10px] sm:text-sm md:text-lg text-purple-600 font-semibold px-2 hidden sm:block">
              9 years of holding hands, growing together, and choosing each other every single day ❤️
            </p>
            {/* Shorter version for mobile */}
            <p className="text-[10px] text-purple-600 font-semibold px-2 sm:hidden">
              9 years together ❤️
            </p>
          </div>

          {/* Mobile: Stacked Compact, Desktop: Side-by-side */}
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-1.5 sm:gap-2 md:gap-3 items-center">
            
            {/* Video - Smaller on Mobile */}
            <div className="flex items-center justify-center w-full shrink-0">
              <div className="rounded-lg sm:rounded-xl overflow-hidden shadow-xl border-2 sm:border-3 border-pink-300 w-full max-w-[220px] sm:max-w-[280px] md:max-w-[320px] lg:max-w-[260px]">
                <video 
                  className="w-full h-auto max-h-[220px] sm:max-h-[300px] md:max-h-[350px] object-contain bg-gradient-to-br from-pink-50 to-purple-50"
                  controls 
                  autoPlay
                  loop
                  src={videoSrc}
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>

            {/* Message - Cute & Compact for Mobile */}
            <div className="flex flex-col justify-center w-full shrink-0">
              <div className="bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-xl p-2.5 sm:p-4 md:p-5 border-2 border-pink-200">
                <div className="w-full text-center">
                  
                  {/* Mobile - Super Compact Message */}
                  <div className="block lg:hidden">
                    <p className="text-[11px] sm:text-sm text-gray-700 leading-snug mb-1.5 sm:mb-2">
                 I want to make You feel, the most specil person in the World.
                  <br />
                      Because For me You are...!!!
                    </p>
                    <p className="text-pink-600 font-bold text-sm sm:text-base mb-1.5 sm:mb-2">
                      I Love You... ♥
                    </p>
                    <div className="text-[10px] sm:text-sm text-purple-600 font-medium">
                       Forever & Always 💖
                    </div>
                  </div>

                  {/* Desktop - Full Message */}
                  <div className="hidden lg:block">
                    <p className="text-base text-gray-700 leading-relaxed mb-3">
                      I want to make You feel, the most specil person in the World 
                      <br />
                      Because For me You are...!!!
                    </p>
                    <p className="text-pink-600 font-semibold text-lg mb-3">
                      I Love You... ♥
                    </p>
                    <div className="text-base leading-relaxed">
                      💖 My heart feels safest when it's with you 💖
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default SuccessPopup