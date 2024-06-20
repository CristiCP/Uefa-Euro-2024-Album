import React from 'react';

function CardContent({ player, backgroundImageUrl }) {
  console.log(player);
  return (
    <div className='flex flex-col justify-center'>
      <div className='relative w-56 h-56 rounded-t-xl mb-2 overflow-hidden'>
        <img 
          className='absolute inset-0 w-full h-full object-cover'
          style={{
            backgroundImage: `url(${backgroundImageUrl})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center'
          }} 
          loading='lazy'
          src={`https://img.uefa.com/imgml/TP/players/3/2024/cutoff/${player.id}.png`} 
          alt={player.internationalName} 
        />
        <div className='absolute top-1 left-1 p-1 bg-opacity-75 rounded'>
          <img className='w-8 mb-2' src={import.meta.env.VITE_LOGO_API} alt="Logo 1" />
          <img className='w-8' src={`https://img.uefa.com/imgml/flags/240x240/${player.countryCode}.png`} alt="Country Flag" />
        </div>
      </div>
    </div>
  );
}

export default CardContent;
