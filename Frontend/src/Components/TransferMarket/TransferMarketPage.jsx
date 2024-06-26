import React, { useEffect, useState } from 'react';
import { fetchTransfers } from './transferService';
import Card from '../Cards/Card';
import AddToTransferMarket from './AddToTransferMarket';
import { IoMdAddCircle } from "react-icons/io";
import io from 'socket.io-client';

const socket = io('http://127.0.0.1:8000');

function TransferMarketPage() {
  const [transfers, setTransfers] = useState([]);
  const [page, setPage] = useState(1);
  const [showAddToMarket, setShowAddToMarket] = useState(false); 

  useEffect(() => {
    const getTransfers = async () => {
      try {
        const transferData = await fetchTransfers(page);
        setTransfers(transferData);
      } catch (error) {
        console.error(error.message);
      }
    };
    getTransfers();
  }, [page]);

  useEffect(() => {
    if(sessionStorage.getItem('token')) {
      socket.on('newTransfer', (newTransfer) => {
        const currentUser = JSON.parse(sessionStorage.getItem('user'));
        if(transfers.length < 10 && newTransfer.user.username !== currentUser.username) {
        setTransfers(prevTransfers => [...prevTransfers, newTransfer]);
        }
      });
    }
  
      return () => {
        socket.off('newTransfer');
      };
  })

  const handleNextPage = () => {
    if (transfers.length >= 10) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(prevPage => prevPage - 1);
    }
  };

  const handleAddButtonClick = () => {
    setShowAddToMarket(true); 
  };

  return (
    <div className="flex flex-col justify-center bg-blue-700">
      {!showAddToMarket &&<div>
        <h1 className="text-center text-6xl font-bold">
          <div className='flex flex-wrap justify-center'>
            <img src={import.meta.env.VITE_TOURNAMENT_IMAGE_API} alt='Uefa' className="w-58 h-36 mt-24 mb-20 mr-2"/>
          </div>
        </h1>
        <div className="w-full">
          {transfers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
              <ul className='flex justify-center flex-wrap mb-14'>
                {transfers.map(transfer => (
                  <li className='mt-4 mr-2 md:mr-10 mb-2' key={transfer.transferId}>
                    <Card player={transfer.player} cardsEnabled={true}></Card>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-center text-white mt-8"></p>
          )}
        </div>
        <div className='buttons-container'>
          <button className='bg-green-400 px-4 py-2 font-bold hover:bg-green-500 hover:scale-105 rounded-md ml-2' onClick={handleAddButtonClick}>
            <div className='flex justify-center items-center'>
              <IoMdAddCircle />
              <p>Add</p>
            </div>
          </button>
          <button className='bg-white px-4 py-2 font-bold hover:bg-blue-900 hover:scale-105 rounded-md' onClick={handlePrevPage} disabled={page === 1}>Previous</button>
          <button className='bg-white px-4 py-2 font-bold hover:bg-blue-900 hover:scale-105 rounded-md' onClick={handleNextPage} disabled={transfers.length < 10}>Next</button>
        </div>
      </div>}
      {showAddToMarket && <AddToTransferMarket setShowAddToMarket={setShowAddToMarket}/>}
    </div>
  );
}

export default TransferMarketPage;
