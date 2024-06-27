import PropTypes from 'prop-types';
import CardContent from './CardContent';
import { getBackgroundImageUrl } from '../Cards/cardsService';

function Card({ player, cardsEnabled }) {
  return (
    <div className={`flex flex-col player-card p-2 mr-3 ml-3 mt-3 mb-3 shadow-3xl ${cardsEnabled ? 'hover:scale-105 cursor-pointer animate-slide-from-left' : 'opacity-45 pointer-events-none'}`} style={{
        backgroundImage: `url(${getBackgroundImageUrl(player.countryName)})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        borderRadius: '15px'
      }}>
        <div className='flex flex-col items-center'>
          <p className='text-xl font-bold text-white bg-opacity-75 px-2 py-1 rounded-md' style={{
            textShadow: cardsEnabled ? '0 0 10px black' : 'none',
          }}>{player.fieldPosition}</p>
          <CardContent player={player} backgroundImageUrl={'backgroundImageUrl'}></CardContent>
          <div className='flex flex-col justify-center'>
            <p className="text-xl font-bold text-white bg-opacity-75 px-2 py-1 rounded-md" style={{
              textShadow: cardsEnabled ? '0 0 10px white' : 'none',
            }}>
              {player.internationalName}
            </p>
          </div>
        </div>
      </div>
  );
}

Card.propTypes = {
  player: PropTypes.shape({
    countryName: PropTypes.string.isRequired,
    fieldPosition: PropTypes.string.isRequired,
    internationalName: PropTypes.string.isRequired,
    countryCode: PropTypes.string.isRequired,
  }).isRequired,
  cardsEnabled: PropTypes.bool.isRequired,
};

export default Card;
