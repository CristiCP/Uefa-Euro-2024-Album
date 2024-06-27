import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Card from '../Cards/Card';
import { FaExchangeAlt } from "react-icons/fa";
import { fetchUserPlayers } from './transferService';

function SelectPlayerForTransfer({ 
  setSelectPlayerForTransfer, 
  userSelected, 
  playerSelected, 
  setUserSelected, 
  setPlayerSelected 
}) {
  const [players, setPlayers] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  const fetchData = useCallback(async () => {
    const token = sessionStorage.getItem('token');
    try {
      const fetchedPlayers = await fetchUserPlayers(token, page);
      setPlayers(fetchedPlayers);
      setError(null);
    } catch (error) {
      setError('Error fetching players');
      setPlayers([]);
    }
  }, [page]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleNextPage = () => {
    if (players.length >= 20) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(prevPage => prevPage - 1);
    }
  };

  const handleBack = () => {
    setSelectPlayerForTransfer(false);
  };

  const handleExchange = async (playerId) => {
    const token = sessionStorage.getItem('token');
    const data = {
      token,
      playerOfferingId: playerId,
      playerOfferedId: playerSelected, 
      offeredUsername: userSelected   
    };

    try {
      const response = await axios.post(import.meta.env.VITE_CREATE_OFFER_API, data);
      if (response.status === 201) {
        setPlayerSelected('');
        setUserSelected('');
        setSelectPlayerForTransfer(false);
      }
    } catch (error) {
      console.error('Error creating exchange offer:', error);
      alert('Failed to create exchange offer');
      setSelectPlayerForTransfer(false);
      window.location.reload();
    }
  };

  return (
    <div className='mt-24'>
      <h2 className='text-center text-4xl mb-6 font-bold text-white bg-opacity-75 px-2 py-1 rounded-md' style={{ textShadow: '0 0 10px black' }}>
        Select a player for exchange
      </h2>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <div className="container mx-auto">
        <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-14'>
          {players.map((player, index) => (
            <li key={index} className='flex justify-center'>
              <div className='flex flex-col items-center'>
                <Card player={player} cardsEnabled={true} />
                <button className='bg-green-400 px-4 py-2 mt-2 font-bold hover:bg-green-500 hover:scale-105 rounded-md' onClick={() => handleExchange(player.id)}>
                  <div className='flex items-center'>
                    <FaExchangeAlt className='mr-2' />
                    <p>Exchange</p>
                  </div>
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className='buttons-container'>
        <button className='bg-red-600 px-4 py-2 font-bold hover:bg-red-700 hover:scale-105 rounded-md' onClick={handleBack}>Close</button>
        <button className='bg-white px-4 py-2 font-bold hover:bg-blue-900 hover:scale-105 rounded-md' onClick={handlePrevPage} disabled={page === 1}>Previous</button>
        <button className='bg-white px-4 py-2 font-bold hover:bg-blue-900 hover:scale-105 rounded-md' onClick={handleNextPage} disabled={players.length < 20}>Next</button>
      </div>
    </div>
  );
}

SelectPlayerForTransfer.propTypes = {
  setSelectPlayerForTransfer: PropTypes.func.isRequired,
  userSelected: PropTypes.string.isRequired,
  playerSelected: PropTypes.number.isRequired,
  setUserSelected: PropTypes.func.isRequired,
  setPlayerSelected: PropTypes.func.isRequired,
};

export default SelectPlayerForTransfer;
