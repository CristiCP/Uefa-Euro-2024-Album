import React from 'react'
import PacksPage from '../Packs/PacksPage'

function StorePage() {
  return (
    <div className="bg-blue-700 min-h-screen">
      <div className='flex flex-wrap justify-center'>
          <img src={import.meta.env.VITE_TOURNAMENT_IMAGE_API} alt='Uefa' className="w-58 h-36 mt-24 mb-20 mr-2"/>
        </div>
      <PacksPage></PacksPage>
    </div>
  )
}

export default StorePage
