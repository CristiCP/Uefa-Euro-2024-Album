import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { fetchPlayersData } from '../Cards/cardsService';

function CardContent({ player, backgroundImageUrl }) {
  // eslint-disable-next-line no-unused-vars
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    async function getPlayers() {
      try {
        const data = await fetchPlayersData();
        setPlayers(data);
      } catch (error) {
        console.error('Error fetching players:', error);
      }
    }
    getPlayers();
  }, []); 

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

CardContent.propTypes = {
  player: PropTypes.shape({
    id: PropTypes.number.isRequired,
    internationalName: PropTypes.string.isRequired,
    countryCode: PropTypes.string.isRequired,
  }).isRequired,
  backgroundImageUrl: PropTypes.string.isRequired,
};

export default CardContent;
