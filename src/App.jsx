
import { useState, useEffect } from "react"
import Boards from "./components/Boards"
import ImagePieces from "./components/ImagePieces"
import Reference from "./components/Reference"
import SuccessPopup from "./components/popUp/SuccessPopup"
import TryAgainPopup from "./components/popUp/TryAgainPopup"
import video from './assets/video/loveStory.mov'

const App = () => {

  const [boardState, setBoardState] = useState(Array(24).fill(null))
  const [usedPieces, setUsedPieces] = useState(new Set())
  const [showSuccess, setShowSuccess] = useState(false)
  const [showTryAgain, setShowTryAgain] = useState(false)
  const [checkTimeout, setCheckTimeout] = useState(null)


  useEffect(() => {

    if (checkTimeout) {
      clearTimeout(checkTimeout)
      setCheckTimeout(null)
    }


    const allFilled = boardState.every(tile => tile !== null)

    if (allFilled) {
      const allCorrect = boardState.every(tile => tile.isCorrect)

      if (allCorrect) {
        setShowSuccess(true)
      } else {
        const timeout = setTimeout(() => {
          setShowTryAgain(true)
        }, 10000) // 10 seconds
        setCheckTimeout(timeout)
      }
    }


    return () => {
      if (checkTimeout) {
        clearTimeout(checkTimeout)
      }
    }
  }, [boardState])


  const handleDrop = (tileIndex, pieceData, fromBoardIndex = null) => {
    if (fromBoardIndex !== null) {
      const newBoardState = [...boardState]
      const targetPiece = newBoardState[tileIndex]

      // Swap pieces ----
      newBoardState[tileIndex] = {
        ...pieceData,
        isCorrect: pieceData.correctPosition === tileIndex
      }

      if (targetPiece) {
        newBoardState[fromBoardIndex] = {
          ...targetPiece,
          isCorrect: targetPiece.correctPosition === fromBoardIndex
        }
      } else {
        newBoardState[fromBoardIndex] = null
      }

      setBoardState(newBoardState)
      return
    }

    if (boardState[tileIndex]) {
      const existingPiece = boardState[tileIndex]
      const newUsedPieces = new Set(usedPieces)
      newUsedPieces.delete(existingPiece.id)
      newUsedPieces.add(pieceData.id)
      setUsedPieces(newUsedPieces)
    } else {
      setUsedPieces(new Set([...usedPieces, pieceData.id]))
    }

    // Check if piece is placed in correct position
    const isCorrect = pieceData.correctPosition === tileIndex

    // Update board state with new piece
    const newBoardState = [...boardState]
    newBoardState[tileIndex] = {
      ...pieceData,
      isCorrect
    }
    setBoardState(newBoardState)
  }

  // Handle removing a piece from board 
  const handleRemovePiece = (tileIndex) => {
    const piece = boardState[tileIndex]
    if (piece) {

      const newBoardState = [...boardState]
      newBoardState[tileIndex] = null
      setBoardState(newBoardState)

      const newUsedPieces = new Set(usedPieces)
      newUsedPieces.delete(piece.id)
      setUsedPieces(newUsedPieces)
    }
  }

  // Handle reset puzzle
  const handleReset = () => {
    setBoardState(Array(24).fill(null))
    setUsedPieces(new Set())
    setShowTryAgain(false)
    setShowSuccess(false)
    if (checkTimeout) {
      clearTimeout(checkTimeout)
      setCheckTimeout(null)
    }
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 overflow-hidden">

      {/* Floating Hearts */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="heart-float absolute text-pink-400 opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${8 + Math.random() * 4}s`,
              fontSize: `${20 + Math.random() * 30}px`,
            }}
          >
            ♥
          </div>
        ))}
      </div>

      <div className="relative z-10 flex flex-col h-screen px-3 sm:px-4 md:px-6">

        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-center py-2 sm:py-3 mt-5 md:mt-0
              bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500
              text-transparent bg-clip-text drop-shadow-sm shrink-0">
          Made with Love, Just for You  
        </h2>

        <div className="text-center text-xs sm:text-sm mb-1 sm:mb-2 shrink-0">
          <span className="font-semibold text-sm sm:text-lg
        bg-gradient-to-r from-pink-400 to-rose-500
        text-transparent bg-clip-text">
            Solve the puzzle to unlock sweet surprises 
          </span> 
        </div>


        {/* Desktop Layout */}
        <div className="hidden md:flex flex-1 min-h-0 flex-row gap-4 items-center justify-center">
          <div className="flex-1 min-h-0 flex items-center justify-center">
            <Boards
              boardState={boardState}
              onDrop={handleDrop}
              onRemovePiece={handleRemovePiece}
            />
          </div>

          <div className="shrink-0 flex flex-col items-center justify-center gap-2 md:gap-3 pb-3">
            <Reference />
            <ImagePieces usedPieces={usedPieces} />
          </div>
        </div>

        {/* Mobile Layout - NO SCROLL */}
        <div className="flex md:hidden flex-1 min-h-0 flex-col gap-1.5 justify-between pb-20">
          {/* Board and Reference in Row */}
          <div className="flex flex-row gap-2 mt-20 items-start justify-center shrink-0">
            <Boards
              boardState={boardState}
              onDrop={handleDrop}
              onRemovePiece={handleRemovePiece}
            />
            <Reference />
          </div>

          {/* Image Pieces Below - Fits without scroll */}
          <div className="flex items-center justify-center mb-10 shrink-0">
            <ImagePieces usedPieces={usedPieces} />
          </div>
        </div>
      </div>

      {showSuccess && (
        <SuccessPopup
          videoSrc={video}
          onClose={() => setShowSuccess(false)}
        />
      )}

      {showTryAgain && (
        <TryAgainPopup
          onClose={() => setShowTryAgain(false)}
          onReset={handleReset}
        />
      )}
    </div>
  )
}

export default App