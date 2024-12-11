import axios from 'axios';

// URL base de la API
const API_URL = 'https://rickandmortyapi.com/api';

// Función para obtener personajes
export const getCharacters = async () => {
  try {
    const response = await axios.get(`${API_URL}/character`);
    return response.data.results; // Devuelve solo los resultados
  } catch (error) {
    console.error('Error al obtener los personajes:', error);
    throw error; // Lanza el error para manejarlo en el componente
  }
};

export const getSingleCharacter = async (id) => {  
  try {
    const response = await axios.get(`${API_URL}/character/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener los personajes:', error);
    throw error;
  }
};

export const getFilterCharacter = async (name) => {
  try {
    const response = await axios.get(`${API_URL}/character/?name=${name}`);
    console.log(response.data.results);
    return response.data.results; // Devuelve solo los resultados
  } catch (error) {
    console.error('Error al obtener los personajes:', error);
    throw error; // Lanza el error para manejarlo en el componente
  }
};
