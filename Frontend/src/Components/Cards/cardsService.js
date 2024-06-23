import axios from 'axios';

const fetchPlayersData = async () => {
  try {
    const response = await axios.get(import.meta.env.VITE_PLAYERS_API);
    return response.data;
  } catch (error) {
    console.error('Error fetching players:', error);
    throw error;
  }
};

const getBackgroundImageUrl = (countryName) => {
    switch (countryName) {
      case "Türkiye":
        return import.meta.env.VITE_TURKEY_IMAGE;
      case "Czechia":
        return import.meta.env.VITE_CZECH_IMAGE;
      default:
        return `https://img.uefa.com/imgml/uefacom/performancezone/teams-bg/${countryName}_Desktop.jpg`;
    }
  };  

export { fetchPlayersData, getBackgroundImageUrl };