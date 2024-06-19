import React from 'react';
import CardContent from './CardContent';

function Pack({ player }) {
  let backgroundImageUrl = `https://img.uefa.com/imgml/uefacom/performancezone/teams-bg/${player.translations.countryName.EN}_Desktop.jpg`;

  if (player.translations.countryName.EN === "Türkiye") {
    backgroundImageUrl = 'https://img.uefa.com/imgml/uefacom/performancezone/teams-bg/Turkey_Desktop.jpg';
  }
  else if(player.translations.countryName.EN === "Czechia") {
    backgroundImageUrl = 'https://img.uefa.com/imgml/uefacom/performancezone/teams-bg/Czech-Republic_Desktop.jpg';
  }

  return (
    <div className='flex flex-col items-center'>
      <p className='text-xl font-bold text-white bg-opacity-75 px-2 py-1 rounded-md' style={{
             textShadow: '0 0 10px black',
           }}>{player.fieldPosition}</p>
      <CardContent player={player} backgroundImageUrl={backgroundImageUrl}></CardContent>
      <div className='flex flex-col justify-center'>
        <p className="text-xl font-bold text-white bg-opacity-75 px-2 py-1 rounded-md" style={{
             textShadow: '0 0 10px white',
           }}>
          {player.internationalName}
        </p>
      </div>
    </div>
  );
}

export default Pack;
