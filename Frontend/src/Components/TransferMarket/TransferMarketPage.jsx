import { useEffect, useState } from 'react';
import { fetchTransfers } from './transferService';
import Card from '../Cards/Card';
import AddToTransferMarket from './AddToTransferMarket';
import { FaExchangeAlt } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import io from 'socket.io-client';
import SelectPlayerForTransfer from './SelectPlayerForTransfer';

const socket = io(import.meta.env.VITE_SOCKET);

function TransferMarketPage() {
  const [transfers, setTransfers] = useState([]);
  const [page, setPage] = useState(1);
  const [showAddToMarket, setShowAddToMarket] = useState(false); 
  const [showSelectPlayerForTransfer, setSelectPlayerForTransfer] = useState(false);
  const [userSelected,setUserSelected] = useState('');
  const [playerSelected,setPlayerSelected] = useState('');

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
  }, [transfers])

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

  const handleTransferButtonClick = (playerId, username) => () => {
    setSelectPlayerForTransfer(true);
    setPlayerSelected(playerId);
    setUserSelected(username);
  };

  return (
    <div className="flex flex-col justify-center bg-blue-700">
      {!showAddToMarket && !showSelectPlayerForTransfer &&<div>
        <h1 className="text-center text-6xl font-bold">
          <div className='flex flex-wrap justify-center'>
            <img src={import.meta.env.VITE_TOURNAMENT_IMAGE_API} alt='Uefa' className="w-58 h-36 mt-24 mb-20 mr-2"/>
          </div>
        </h1>
        <div className="w-full">
          {transfers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-1 p-4">
              <ul className='flex justify-center flex-wrap mb-14'>
                {transfers.map(transfer => (
                  <li className='flex flex-wrap bg-blue-900 rounded-xl flex-row mt-4 mr-2 mb-2' key={transfer.transferId}>
                    <Card player={transfer.player} cardsEnabled={true}></Card>
                    <div className='flex flex-col items-center justify-between ml-2 md:ml-0'>
                      <div className='flex items-center mt-2'>
                        <FaUser className='text-white'/>
                        <p 
                          className="text-xl font-bold text-white bg-opacity-75 px-2 py-1 rounded-md" 
                          style={{textShadow:'0 0 10px black',
                          }}>{transfer.user.username}
                        </p>
                      </div>
                      <div className='flex items-center mb-3 md:mr-3'>
                        <button className='bg-green-400 px-4 py-2 font-bold hover:bg-green-600 hover:scale-105 rounded-lg' onClick={handleTransferButtonClick(transfer.player.id, transfer.user.username)}>
                          <div className='flex items-center'>
                            <FaExchangeAlt className='mr-2' />
                            <p>Transfer</p>
                          </div>
                        </button>
                      </div>
                    </div>
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
            Add
          </button>
          <button className='bg-white px-4 py-2 font-bold hover:bg-blue-900 hover:scale-105 rounded-md' onClick={handlePrevPage} disabled={page === 1}>Previous</button>
          <button className='bg-white px-4 py-2 font-bold hover:bg-blue-900 hover:scale-105 rounded-md' onClick={handleNextPage} disabled={transfers.length < 10}>Next</button>
        </div>
      </div>}
      {showAddToMarket && <AddToTransferMarket setShowAddToMarket={setShowAddToMarket}/>}
      {showSelectPlayerForTransfer && <SelectPlayerForTransfer 
       setSelectPlayerForTransfer={setSelectPlayerForTransfer}
       userSelected={userSelected}
       playerSelected={playerSelected}
       setUserSelected={setUserSelected}
       setPlayerSelected={setPlayerSelected}
       ></SelectPlayerForTransfer>}
    </div>
  );
}

export default TransferMarketPage;
