import axios from 'axios';

const openPack = async (selectedPack) => {
  try {
    const response = await axios.post(import.meta.env.VITE_OPENPACKS_API, { selectedPack });
    return response.data;
  } catch (error) {
    console.error('Error opening pack:', error);
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

export { getBackgroundImageUrl, openPack };