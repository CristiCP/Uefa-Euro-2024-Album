import React from 'react';
import AvailableTeams from './AvailableTeams';

function Home() {
  return (
    <div className="flex flex-col justify-center bg-blue-700">
      <h1 className="text-center text-6xl font-bold">
        <div className='flex flex-wrap justify-center'>
          <img src={import.meta.env.VITE_TOURNAMENT_IMAGE_API} alt='Uefa' className="w-58 h-36 mt-24 mb-20 mr-2"/>
        </div>
      </h1>
      <div className="w-full">
        <AvailableTeams />
      </div>
    </div>
  );
}

export default Home;
