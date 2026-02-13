import { useEffect, useState } from 'react'
import { imagePieces } from '../Utility/Images'

const ImagePieces = ({ usedPieces }) => {
  const [pieceImage, setPieceImage] = useState([])

  useEffect(() => {
    // Shuffle the pieces
    const shuffled = [...imagePieces]

    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }

    setPieceImage(shuffled)
  }, [])

  // Handle drag start
  const handleDragStart = (e, piece) => {
    e.dataTransfer.setData('piece', JSON.stringify(piece))
    e.currentTarget.style.opacity = '0.5'
  }

  
  const handleDragEnd = (e) => {
    e.currentTarget.style.opacity = '1'
  }

  return (
    <div className="w-full max-w-[350px] sm:max-w-[380px] md:max-w-[600px] lg:max-w-[900px]
                    flex flex-wrap items-center justify-center
                    rounded-2xl shadow-xl bg-white/90 backdrop-blur-sm
                    border-4 border-pink-200 p-1.5 sm:p-2 gap-0.5">
      {pieceImage.map((piece) => {
        const isUsed = usedPieces.has(piece.id)
        
        return (
          <div
            key={piece.id}
            className={`w-[38px] h-[42px] sm:w-[52px] sm:h-[58px] md:w-[60px] md:h-[66px] relative
                       border transition-all duration-300
                       ${isUsed 
                         ? 'border-gray-200 bg-gray-100 opacity-40 cursor-not-allowed scale-95' 
                         : 'border-pink-200 hover:border-purple-400 hover:scale-105 cursor-grab active:cursor-grabbing hover:shadow-lg'
                       }`}
            draggable={!isUsed}
            onDragStart={(e) => !isUsed && handleDragStart(e, piece)}
            onDragEnd={handleDragEnd}
          >
            <img
              src={piece.image}
              alt="Image piece"
              className={`w-full h-full object-cover pointer-events-none transition-all duration-300
                         ${isUsed ? 'grayscale blur-[1px]' : ''}`}
            />
            {isUsed && (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-gray-400 text-[8px] sm:text-xs font-bold bg-white/60 px-1 py-0.5 rounded">
                  Used
                </span>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default ImagePieces