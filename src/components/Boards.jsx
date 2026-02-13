

import { useState } from "react"
import blankImg from '../assets/images/blankImage.jpeg'

const Boards = ({ boardState, onDrop, onRemovePiece }) => {
  const rows = 4
  const columns = 6
  const totalTiles = rows * columns

  const [dragOverIndex, setDragOverIndex] = useState(null)
  const [draggingFromIndex, setDraggingFromIndex] = useState(null)

 
  const handleDragStartFromBoard = (e, index, piece) => {
    if (!piece) return
    
    e.dataTransfer.setData('piece', JSON.stringify(piece))
    e.dataTransfer.setData('fromBoard', index.toString())
    setDraggingFromIndex(index)
    e.currentTarget.style.opacity = '0.5'
  }


  const handleDragEnd = (e) => {
    e.currentTarget.style.opacity = '1'
    setDraggingFromIndex(null)
  }

  
  const handleDragOver = (e, index) => {
    e.preventDefault()
    setDragOverIndex(index)
  }

  
  const handleDragLeave = () => {
    setDragOverIndex(null)
  }

  
  const handleDrop = (e, index) => {
    e.preventDefault()
    setDragOverIndex(null)
    
    const pieceData = JSON.parse(e.dataTransfer.getData('piece'))
    const fromBoardIndex = e.dataTransfer.getData('fromBoard')
    

    if (fromBoardIndex) {
      const fromIndex = parseInt(fromBoardIndex)
      
      if (fromIndex === index) return
      onDrop(index, pieceData, fromIndex)
    } else {
      
      onDrop(index, pieceData)
    }
  }

  
  const handleDoubleClick = (index) => {
    if (boardState[index]) {
      onRemovePiece(index)
    }
  }

  return (
    <div className="flex justify-center items-center">
      <div className="w-[180px] sm:w-[200px] md:w-[280px] lg:w-[300px] 
                      h-[270px] sm:h-[300px] md:h-[420px] lg:h-[450px]
                      flex flex-wrap rounded-2xl shadow-xl bg-white/90 backdrop-blur-sm
                      border-4 border-pink-200 p-1">
        {Array.from({ length: totalTiles }).map((_, index) => {
          const piece = boardState[index]
          const isDragOver = dragOverIndex === index
          const isDragging = draggingFromIndex === index
          const isCorrect = piece?.isCorrect
          const isIncorrect = piece && !piece.isCorrect

          return (
            <div
              key={index}
              className={`w-[calc(16.666%-2px)] h-[calc(25%-2px)] 
                         border transition-all duration-200
                         ${isDragOver ? 'border-purple-500 border-2 bg-purple-100' : 'border-pink-200'}
                         ${isDragging ? 'opacity-50' : ''}
                         ${isCorrect ? 'border-green-400 border-2' : ''}
                         ${isIncorrect ? 'border-red-400 border-2' : ''}
                         ${piece ? 'cursor-move hover:border-purple-400' : 'cursor-pointer hover:border-purple-300'}`}
              draggable={!!piece}
              onDragStart={(e) => handleDragStartFromBoard(e, index, piece)}
              onDragEnd={handleDragEnd}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, index)}
              onDoubleClick={() => handleDoubleClick(index)}
              title={piece ? "Drag to move or double-click to remove" : "Drop piece here"}
            >
              <img
                src={piece ? piece.image : blankImg}
                alt="tile"
                className="w-full h-full object-cover pointer-events-none"
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Boards