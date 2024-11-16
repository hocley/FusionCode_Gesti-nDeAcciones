const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config({path: '../../config/.env'});

const API_KEY = process.env.ALPHA_VANTAGE_API_KEY;

// Función para obtener el valor actual de una acción
const getStockPrice = async (symbol) => {
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${API_KEY}`;

    try {
        const response = await axios.get(url);
        const data = response.data;

        // Extraer el precio de la acción más reciente
        const latestTime = Object.keys(data['Time Series (5min)'])[0];
        const latestPrice = data['Time Series (5min)'][latestTime]['4. close'];

        return parseFloat(latestPrice);
    } catch (error) {
        console.error('Error al obtener el precio de la acción:', error);
        throw new Error('No se pudo obtener el precio de la acción');
    }
};


const getSymbolSearch = async (name) => {
    const GET_NAME_URL = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${name}&apikey=${API_KEY}`;

    try {
        // Realizamos la solicitud a la API
        const response = await fetch(GET_NAME_URL);
        const data = await response.json();

        // Verificamos si la respuesta contiene la clave 'bestMatches' y si es un arreglo
        if (data.bestMatches && Array.isArray(data.bestMatches)) {
            // Mapeamos la respuesta para obtener solo los valores que necesitamos
            return data.bestMatches.map((match) => ({
                symbol: match['1. symbol'],  // Símbolo de la acción
                name: match['2. name'],      // Nombre de la empresa
                region: match['4. region'],  // Región
            }));
        } else {
            throw new Error('No se encontraron coincidencias');
        }

    } catch (error) {
        console.error('Error al obtener el nombre de la acción:', error);
        throw new Error('No se pudo obtener las acciones');
    }
};

module.exports = {getStockPrice, getSymbolSearch};