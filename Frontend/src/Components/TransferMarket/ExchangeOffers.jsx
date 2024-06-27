import React, { useState, useEffect } from 'react';
import { FaExchangeAlt } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import Card from '../Cards/Card';
import axios from 'axios'; 
import { fetchExchangeOffers } from './transferService'; 

function ExchangeOffers() {
  const [exchangeOffers, setExchangeOffers] = useState([]);

  useEffect(() => {
    const fetchOffers = async () => {
      const token = sessionStorage.getItem('token');
      try {
        const offers = await fetchExchangeOffers(token);
        setExchangeOffers(offers);
      } catch (error) {
        console.log('Error fetching exchange offers');
      }
    };
    fetchOffers();
  }, []);

  const acceptOffer = async (token, offeredUsername, playerOfferingId, playerOfferedId, exchangeId) => {
    try {
      const response = await axios.post(import.meta.env.VITE_ACCEPT_OFFER_API, {
        token,
        offeredUsername,
        playerOfferingId,
        playerOfferedId,
        exchangeId
      });
      setExchangeOffers(prevOffers => prevOffers.filter(offer => offer.exchangeId !== exchangeId));
      
    } catch (error) {
      console.error('Error accepting offer:', error.message);
    }
  };

  return (
    <div>
      <h1 className="text-center text-6xl font-bold">
        <div className='flex flex-wrap justify-center'>
          <img src={import.meta.env.VITE_TOURNAMENT_IMAGE_API} alt='Uefa' className="w-58 h-36 mt-24 mb-20 mr-2"/>
        </div>
      </h1>  
      <div>
        <div className="flex justify-center">
          <ul className='flex justify-center flex-wrap md:flex-col mb-14'>
            {exchangeOffers.map(exchangeOffer => (
              <li className='flex flex-wrap justify-center items-center bg-blue-900 rounded-xl flex-row mt-2 mr-2 mb-10' key={exchangeOffer.exchangeId}>
                <div>
                  <p className="flex justify-center text-xl font-bold text-white bg-opacity-75 px-2 py-1 rounded-md" style={{ textShadow: '0 0 10px black' }}>
                    His
                  </p>
                  <Card player={exchangeOffer.playerOffering} cardsEnabled={true}></Card>
                </div>
                <div className='flex flex-col items-center md:justify-between'>
                  <div className='flex items-center mt-2'>
                    <FaUser className='text-white'/>
                    <p className="text-xl font-bold text-white bg-opacity-75 px-2 py-1 rounded-md" style={{ textShadow: '0 0 10px black' }}>{exchangeOffer.userOffering}</p>
                  </div>
                  <div className='flex items-center mr-3 mb-3'>
                    <button
                      onClick={() => acceptOffer(
                        sessionStorage.getItem('token'), 
                        exchangeOffer.userOffering,
                        exchangeOffer.playerOffering.id, 
                        exchangeOffer.playerOffered.id, 
                        exchangeOffer.exchangeId 
                      )}
                      className='bg-green-400 px-4 py-2 font-bold hover:bg-green-600 hover:scale-105 rounded-lg'
                    >
                      <div className='flex items-center'>
                        <FaExchangeAlt className='mr-2' />
                        <p>Transfer</p>
                      </div>
                    </button>
                  </div>
                </div>
                <div>
                  <p className="flex justify-center text-xl font-bold text-white bg-opacity-75 px-2 py-1 rounded-md" style={{ textShadow: '0 0 10px black' }}>
                    Your
                  </p>
                  <Card player={exchangeOffer.playerOffered} cardsEnabled={true}></Card>
                </div>
              </li>
            ))}
          </ul>
        </div>  
      </div>
    </div>
  );
}

export default ExchangeOffers;
