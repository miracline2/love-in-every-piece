
import refImage from '../assets/images/fullimage.jpeg'

const Reference = () => {
  return (
    <div className='flex justify-center items-center'>
      <div className='flex flex-col gap-1 md:gap-3'>
        <p className='text-center text-xs sm:text-sm md:text-xl font-semibold font-serif text-purple-600'>
          Reference Image
        </p>
        <div className="rounded-2xl shadow-xl overflow-hidden border-4 border-pink-200 bg-white/90 backdrop-blur-sm">
          <img 
            className='w-[135px] h-[203px] sm:w-[150px] sm:h-[225px] md:w-[210px] md:h-[315px] lg:w-[225px] lg:h-[338px] object-cover' 
            src={refImage} 
            alt="reference-Image" 
          />
        </div>
      </div>
    </div>
  )
}

export default Reference