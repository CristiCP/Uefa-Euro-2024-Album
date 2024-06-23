import React from 'react'
import packCommon from '../../../Images/common-pack.png';

function CommonPack({handlePackClick}) {
  return (
    <div
        className="container flex flex-col items-center rounded-xl overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:cursor-pointer"
        style={{ width: '300px', height: '400px', margin: '0' }}
        onClick={() => handlePackClick('Common Pack')}
    >
        <span className="text-3xl mb-2 font-bold text-white bg-opacity-75 px-2 py-1 rounded-md" style={{
        textShadow: '0 0 10px black'}}>
        Common Pack</span>
        <img src={packCommon} alt="Pack" className='rounded-xl mt-2 h-80 shadow-xl'></img>
    </div>
  )
}

export default CommonPack
