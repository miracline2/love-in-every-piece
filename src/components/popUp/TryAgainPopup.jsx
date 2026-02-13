
import React from 'react'

const TryAgainPopup = ({ onClose, onReset }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fadeIn p-3 sm:p-4">
      <div className="relative bg-gradient-to-br from-orange-100 via-yellow-100 to-pink-100 rounded-3xl shadow-2xl p-4 sm:p-5 md:p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-shake border-4 border-orange-300 custom-scrollbar">
        
        {/* Mobile: Stacked, Desktop: Side-by-side */}
        <div className="flex flex-col md:grid md:grid-cols-2 gap-4 sm:gap-6 items-center">
          
          {/* Emoji & Title */}
          <div className="text-center md:text-left flex flex-col items-center md:items-start justify-center">
            <div className="text-6xl sm:text-7xl md:text-9xl mb-3 sm:mb-4 animate-bounce-slow">
              😅
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-orange-700 mb-1 sm:mb-2">
              Oops! 
            </h2>
            <p className="text-xl sm:text-2xl md:text-3xl text-orange-600 font-semibold">
              You Made a Mistake! 💭
            </p>
          </div>

          {/* Message & Buttons */}
          <div className="flex flex-col gap-3 sm:gap-4 w-full">
           
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-5 md:p-6 border-2 border-orange-200">
              <p className="text-center md:text-left text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
                Don't worry, my love! 
                <br />
                Even the best puzzles need a little retry sometimes. 
                <br />
                <span className="text-orange-600 font-semibold text-base sm:text-lg md:text-xl">
                  You've got this! Try again! 💪✨
                </span>
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-2 sm:gap-3">
              <button
                onClick={onReset}
                className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-5 py-2.5 sm:px-6 sm:py-3 rounded-full font-semibold text-sm sm:text-base md:text-lg hover:from-orange-600 hover:to-pink-600 transition-all duration-300 hover:scale-105 shadow-lg cursor-pointer"
              >
                Reset & Try Again 🔄
              </button>
              <button
                onClick={onClose}
                className="bg-gray-200 text-gray-700 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full font-semibold text-sm sm:text-base md:text-lg hover:bg-gray-300 transition-all duration-300 cursor-pointer"
              >
                Keep Trying 💪
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default TryAgainPopup