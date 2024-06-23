import React, { useState } from 'react';
import PackContent from './PackContent';
import '../Packs//packs.css';
import LoadingPack from './LoadingPack';
import ConfirmationPack from './ConfirmationPack';
import CommonPack from './PacksRarity/CommonPack';
import RarePack from './PacksRarity/RarePack';
import LegendaryPack from './PacksRarity/LegendaryPack';
import {getBackgroundImageUrl} from '../Packs/packsService'; 

function PacksPage() {
  const [selectedPack, setSelectedPack] = useState(null);
  const [confirmOpening, setConfirmOpening] = useState(false);
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(false);

  const handlePackClick = (packName) => {
    setSelectedPack(packName);
  };

  return (
    <div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center'>
        {!confirmOpening && !players.length && (
          <>
            <CommonPack handlePackClick={handlePackClick}></CommonPack>
            <RarePack handlePackClick={handlePackClick}></RarePack>
            <LegendaryPack handlePackClick={handlePackClick}></LegendaryPack>
          </>
        )}
        {selectedPack && (
          <ConfirmationPack setConfirmOpening={setConfirmOpening} setLoading={setLoading} setPlayers={setPlayers} setSelectedPack={setSelectedPack} selectedPack={selectedPack}></ConfirmationPack>
        )}
        {loading && (
          <LoadingPack></LoadingPack>
        )}
      </div>

      {players.length > 0 && (
        <div className="w-full">
          <div className="flex flex-wrap justify-center">
            {players.map((player, index) => ( 
                <div key={player.id} className='flex flex-col player-card animate-slide-from-left p-2 mr-3 ml-3 mt-3 mb-3 shadow-3xl hover:scale-105 hover:cursor-pointer' style={{
                  backgroundImage: `url(${getBackgroundImageUrl(player.countryName)})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  borderRadius: '15px',
                }}>
                  <PackContent player={player} />
                </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default PacksPage;
