import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../Cards/Card';
import { IoMdAddCircle } from "react-icons/io";
import { fetchUserPlayers,addToTransferMarket } from './transferService';

function AddToTransferMarket({ setShowAddToMarket }) {
  const [players, setPlayers] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  const fetchData = async () => {
    const token = sessionStorage.getItem('token');
    try {
      const fetchedPlayers = await fetchUserPlayers(token, page);
      setPlayers(fetchedPlayers);
    } catch (error) {
      setError();
      setPlayers([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

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
    setShowAddToMarket(false);
  };

  const handleAddToMarket = async (playerId) => {
    try {
      const token = sessionStorage.getItem('token');
      await addToTransferMarket(token, playerId);
      await fetchData();
    } catch (error) {
      console.error('Error adding player to transfer market:', error);
    }
  };

  return (
    <div className='mt-24'>
      <h2 className='text-center text-4xl mb-6 font-bold text-white bg-opacity-75 px-2 py-1 rounded-md' style={{ textShadow: '0 0 10px black' }}>
        Duplicates
      </h2>
      {error && <p>{error}</p>}
      <div className="container mx-auto">
        <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-14'>
          {players.map((player, index) => (
            <li key={index} className='flex justify-center'>
              <div className='flex flex-col items-center'>
                <Card player={player} cardsEnabled={true} />
                <button className='bg-green-400 px-4 py-2 mt-2 font-bold hover:bg-green-500 hover:scale-105 rounded-md' onClick={() => handleAddToMarket(player.id)}>
                  <div className='flex items-center'>
                    <IoMdAddCircle className='mr-2' />
                    <p>Add to Transfer Market</p>
                  </div>
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className='buttons-container'>
        <button className='bg-yellow-400 px-4 py-2 font-bold hover:bg-yellow-500 hover:scale-105 rounded-md' onClick={handleBack}>Transfers</button>
        <button className='bg-white px-4 py-2 font-bold hover:bg-blue-900 hover:scale-105 rounded-md' onClick={handlePrevPage} disabled={page === 1}>Previous</button>
        <button className='bg-white px-4 py-2 font-bold hover:bg-blue-900 hover:scale-105 rounded-md' onClick={handleNextPage} disabled={players.length < 20}>Next</button>
      </div>
    </div>
  );
}

export default AddToTransferMarket;
