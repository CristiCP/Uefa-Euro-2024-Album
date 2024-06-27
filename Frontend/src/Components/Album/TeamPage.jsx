import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { fetchPlayersByTeam, fetchUserPlayers } from './albumService';
import Card from '../Cards/Card';

function TeamPage({ team, isVisible }) {
  const [players, setPlayers] = useState([]);
  const [userPlayers, setUserPlayers] = useState([]);

  useEffect(() => {
    const getPlayers = async () => {
      try {
        const sortedPlayers = await fetchPlayersByTeam(team.teamId);
        setPlayers(sortedPlayers);
        const token = sessionStorage.getItem('token');
        const fetchedPlayers = await fetchUserPlayers(token);
        setUserPlayers(fetchedPlayers);
      } catch (error) {
        console.error('Error fetching players:', error);
      }
    };

    if (isVisible) {
      getPlayers();
    }
  }, [team.teamId, isVisible]);

  const isUserPlayer = (playerId) => {
    return userPlayers.some(player => player.player_id === playerId);
  };

  const renderPlayersByPosition = (position) => {
    return (
      <ul className='flex justify-center flex-wrap mb-14'>
        {players
          .filter(player => player.fieldPosition === position)
          .map(player => (
            <li className='mt-4 mr-2 md:mr-10 mb-2' key={player.id}>
              <Card player={player} cardsEnabled={isUserPlayer(player.id)}></Card>
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

TeamPage.propTypes = {
  team: PropTypes.any,
  isVisible: PropTypes.bool.isRequired,
};

export default TeamPage;
