import React, { useState, useEffect } from 'react';
import { fetchPlayersByTeam } from './albumService';
import Card from '../Cards/Card';

function TeamPage({ team, isVisible }) {
  const [players, setPlayers] = useState([]);
  const [cardsEnabled, setCardsEnabled] = useState(false);

  useEffect(() => {
    const getPlayers = async () => {
      try {
        const sortedPlayers = await fetchPlayersByTeam(team.teamId);
        setPlayers(sortedPlayers);
      } catch (error) {
        console.error('Error fetching players:', error);
      }
    };

    if (isVisible) {
      getPlayers();
    }
  }, [team.teamId, isVisible]);

  const renderPlayersByPosition = (position) => {
    return (
      <ul className='flex justify-center flex-wrap mb-14'>
        {players
          .filter(player => player.fieldPosition === position)
          .map(player => (
            <li className='mt-4 mr-2 md:mr-10 mb-2' key={player.id}>
              <Card player={player} cardsEnabled={cardsEnabled}></Card>
            </li>
          ))}
      </ul>
    );
  };

  return (
    <div className='flex flex-col justify-center'>
      <div className='flex justify-center flex-wrap items-center mb-4'>
        <img className='w-16 h-16' style={{ textShadow: '0 0 10px white' }} src={team.teamImage} alt={team.teamName} />
        <p className="text-4xl font-bold text-white bg-opacity-75 px-2 py-1 rounded-md" style={{ textShadow: '0 0 10px black' }}>
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
