import React from 'react'
import Packs from './Packs'

function PackOpener() {
  return (
    <div className="bg-blue-700 min-h-screen">
      <div className='flex flex-wrap justify-center'>
          <img src={import.meta.env.VITE_TOURNAMENT_IMAGE_API} alt='Uefa' className="w-58 h-36 mt-24 mb-20 mr-2"/>
        </div>
      <Packs></Packs>
    </div>
  )
}

export default PackOpener
