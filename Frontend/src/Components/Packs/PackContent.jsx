import PropTypes from 'prop-types';
import CardContent from '../Cards/CardContent';

function PackContent({ player }) {
  let backgroundImageUrl = `https://img.uefa.com/imgml/uefacom/performancezone/teams-bg/${player.countryName}_Desktop.jpg`;

  if (player.countryName === "Türkiye") {
    backgroundImageUrl = import.meta.env.VITE_TURKEY_IMAGE;
  } else if (player.countryName === "Czechia") {
    backgroundImageUrl = import.meta.env.VITE_CZECH_IMAGE;
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

PackContent.propTypes = {
  player: PropTypes.shape({
    countryName: PropTypes.string.isRequired,
    fieldPosition: PropTypes.string.isRequired,
    internationalName: PropTypes.string.isRequired,
  }).isRequired,
};

export default PackContent;
