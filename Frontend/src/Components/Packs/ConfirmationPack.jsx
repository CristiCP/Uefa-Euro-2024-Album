import React from 'react'
import { openPack } from '../Packs/packsService';

function ConfirmationPack({setConfirmOpening,setLoading,setPlayers,setSelectedPack,selectedPack}) {

  const handleConfirmModal = async () => {
    setConfirmOpening(true);
    setLoading(true);
    try {
      if (selectedPack) {
        const players = await openPack(selectedPack);
        setPlayers(players);
      } else {
        console.error('No pack selected.');
      }
    } catch (error) {
      console.error('Error sending confirmation:', error);
    } finally {
      setLoading(false);
    }
    handleCloseModal();
  };
  const handleCloseModal = () => {
    setSelectedPack(null);
  };

  return (
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
  )
}

export default ConfirmationPack
