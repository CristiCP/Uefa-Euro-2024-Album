import axios from 'axios';

export const fetchTransfers = async (page = 1, limit = 10) => {
  try {
    const config = {
      headers: {
        Authorization: sessionStorage.getItem('token')
      }}
    const response = await axios.get(`${import.meta.env.VITE_TRANSFERS_API}?page=${page}&limit=${limit}`,config);
    return response.data;
  } catch (error) {
    console.error('Error fetching transfers:', error);
    throw error;
  }
};

export const fetchUserPlayers = async (token,page = 1) => {
  try {
    const config = {
      headers: {
        Authorization: token
      },
      params: {
        page: page  
      }
    };
    const response = await axios.get(import.meta.env.VITE_USER_PLAYERS_DETAILS_API, config);
    return response.data.players;
  } catch (error) {
    throw new Error('Error fetching user players');
  }
};

export const addToTransferMarket = async (token, playerId) => {
  try {
    const response = await axios.post(import.meta.env.VITE_POST_TRANSFER_API, { token, playerId });
    return response.data; 
  } catch (error) {
    console.error('Error adding player to transfer market:', error);
    throw error;
  }
}

export const fetchExchangeOffers = async (token) => {
  try {
    const response = await axios.get(import.meta.env.VITE_EXCHANGE_API, {
      headers: {
        Authorization: token
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching exchange offers:', error);
    throw new Error('Error fetching exchange offers');
  }
};
