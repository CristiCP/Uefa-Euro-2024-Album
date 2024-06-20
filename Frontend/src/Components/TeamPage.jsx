import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CardContent from './CardContent';

function TeamPage({ team, isVisible }) {
  const [players, setPlayers] = useState([]);

  const getBackgroundImageUrl = (countryName) => {
    switch (countryName) {
      case "Türkiye":
        return 'https://img.uefa.com/imgml/uefacom/performancezone/teams-bg/Turkey_Desktop.jpg';
      case "Czechia":
        return 'https://img.uefa.com/imgml/uefacom/performancezone/teams-bg/Czech-Republic_Desktop.jpg';
      default:
        return `https://img.uefa.com/imgml/uefacom/performancezone/teams-bg/${countryName}_Desktop.jpg`;
    }
  };

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await axios.get(`https://compstats.uefa.com/v1/player-ranking`, {
          params: {
            competitionId: 3,
            limit: 30,
            offset: 0,
            optionalFields: 'PLAYER,TEAM',
            order: 'DESC',
            phase: 'TOURNAMENT',
            seasonYear: 2024,
            stats: 'minutes_played_official,matches_appearance,goals,assists,top_speed,distance_covered',
            teamId: team.teamId
          }
        });

        const sortedPlayers = response.data.sort((a, b) => {
          const positionOrder = {
            DEFENDER: 2,
            MIDFIELDER: 3,
            FORWARD: 4,
            GOALKEEPER: 1
          };

          const positionA = a.player.fieldPosition;
          const positionB = b.player.fieldPosition;

          if (positionOrder[positionA] === undefined && positionOrder[positionB] === undefined) {
            return 0;
          } else if (positionOrder[positionA] === undefined) {
            return 1; 
          } else if (positionOrder[positionB] === undefined) {
            return -1; 
          } else {
            return positionOrder[positionA] - positionOrder[positionB];
          }
        });

        setPlayers(sortedPlayers); 
      } catch (error) {
        console.error('Error fetching players:', error);
      }
    };

    if (isVisible) {
      fetchPlayers();
    }
  }, [team.teamId, isVisible]); 

  const renderPlayersByPosition = (position) => {
    return (
      <ul className='flex justify-center flex-wrap mb-14'>
        {players
          .filter(player => player.player.fieldPosition === position)
          .map(player => (
            <li className='mt-4 mr-2 md:mr-10 mb-2' key={player.playerId}>
                <div className='flex flex-col player-card animate-slide-from-left p-2 mr-3 ml-3 mt-3 mb-3 shadow-3xl hover:scale-105 hover:cursor-pointer' style={{
                  backgroundImage: `url(${getBackgroundImageUrl(player.player.translations.countryName.EN)})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  borderRadius: '15px',
                }}>
                  <div className='flex flex-col items-center'>
                    <p className='text-xl font-bold text-white bg-opacity-75 px-2 py-1 rounded-md' style={{
                      textShadow: '0 0 10px black',
                    }}>{player.player.fieldPosition}</p>
                    <CardContent player={player.player} backgroundImageUrl={'backgroundImageUrl'}></CardContent>
                    <div className='flex flex-col justify-center'>
                      <p className="text-xl font-bold text-white bg-opacity-75 px-2 py-1 rounded-md" style={{
                        textShadow: '0 0 10px white',
                      }}>
                        {player.player.internationalName}
                      </p>
                    </div>
                  </div>
                </div>
            </li>
          ))}
      </ul>
    );
  };

  return (
    <div className='flex flex-col justify-center '>
      <div className='flex justify-center flex-wrap items-center mb-4'>
        <img className='w-16 h-16' style={{
             textShadow: '0 0 10px white',
           }} src={team.teamImage} alt={team.teamName} />
        <p className="text-4xl font-bold text-white bg-opacity-75 px-2 py-1 rounded-md" style={{
             textShadow: '0 0 10px black',
           }}>
          {team.teamName}
        </p>
      </div>
  
      <div className="flex justify-center flex-wrap w-full">
        <div className="flex justify-center w-full mb-2">
          {renderPlayersByPosition('GOALKEEPER')}
        </div>
        <div className="flex justify-center w-full mb-2">
          {renderPlayersByPosition('DEFENDER')}
        </div>
        <div className="flex justify-center w-full mb-2">
          {renderPlayersByPosition('MIDFIELDER')}
        </div>
        <div className="w-full mb-2">
          {renderPlayersByPosition('FORWARD')}
        </div>
      </div>
    </div>
  );
}

export default TeamPage;
