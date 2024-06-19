import React, { useState } from 'react';
import packCommon from '../Design/common-pack.png';
import packRare from '../Design/rare-pack.png';
import packLegendary from '../Design/legendary-pack.png';
import axios from 'axios';
import Pack from './Pack';
import '../Design/Packs.css';
import loadingSvg from '../Design/loading.svg';

function Packs() {
  const [selectedPack, setSelectedPack] = useState(null);
  const [confirmOpening, setConfirmOpening] = useState(false);
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(false);

  const handlePackClick = (packName) => {
    setSelectedPack(packName);
  };

  const handleCloseModal = () => {
    setSelectedPack(null);
  };

  const handleConfirmModal = () => {
    setConfirmOpening(true);
    setLoading(true);

    if (selectedPack) {
      const dataToSend = {
        selectedPack: selectedPack
      };
      axios.post('http://127.0.0.1:8000/openPack', dataToSend)
        .then(response => {
          setPlayers(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error sending confirmation:', error);
          setLoading(false);
        });
    } else {
      console.error('No pack selected.');
      setLoading(false);
    }
    handleCloseModal();
  };

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

  return (
    <div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center'>
        {!confirmOpening && !players.length && (
          <>
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

            <div
              className="container flex flex-col items-center rounded-xl overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:cursor-pointer"
              style={{ width: '300px', height: '400px', margin: '0' }}
              onClick={() => handlePackClick('Rare Pack')}
            >
              <span className="text-3xl mb-2 font-bold text-white bg-opacity-75 px-2 py-1 rounded-md" style={{
             textShadow: '0 0 10px black'}}>Rare Pack</span>
              <img src={packRare} alt="Pack" className='rounded-xl mt-2 h-80 shadow-xl'></img>
            </div>

            <div
              className="container flex flex-col items-center rounded-xl overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:cursor-pointer"
              style={{ width: '300px', height: '400px', margin: '0' }}
              onClick={() => handlePackClick('Legendary Pack')}
            >
              <span className="text-3xl mb-2 font-bold text-white bg-opacity-75 px-2 py-1 rounded-md" style={{
             textShadow: '0 0 10px black'}}>Legendary Pack</span>
              <img src={packLegendary} alt="Pack" className='rounded-xl mt-2 h-80 shadow-xl'></img>
            </div>
          </>
        )}

        {selectedPack && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div className="bg-white p-8 rounded-xl">
              <h2 className="text-3xl font-bold mb-4">{selectedPack}</h2>
              <p className="text-xl">Are you sure you want to select this pack?</p>
              <div className="flex justify-end mt-4">
                <button
                  className='px-4 py-2 mr-4 bg-green-500 text-white rounded-xl hover:bg-green-600'
                  onClick={handleConfirmModal}
                >
                  Confirm
                </button>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {loading && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div className="p-8 rounded-xl">
              <img src={loadingSvg} className='w-48' alt="Loading..." />
            </div>
          </div>
        )}
      
      </div>

      {players.length > 0 && (
        <div className="w-full">
          <div className="flex flex-wrap justify-center">
            {players.map((player, index) => (
              <a key={index} href={`https://www.uefa.com/euro2024/teams/players/${player.id}`} target="_blank" rel="noopener noreferrer">
                <div className='flex flex-col player-card animate-slide-from-left p-2 mr-3 ml-3 mt-3 mb-3 shadow-3xl hover:scale-105 hover:cursor-pointer' style={{
                  backgroundImage: `url(${getBackgroundImageUrl(player.translations.countryName.EN)})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  borderRadius: '15px',
                }}>
                  <Pack player={player} />
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Packs;
