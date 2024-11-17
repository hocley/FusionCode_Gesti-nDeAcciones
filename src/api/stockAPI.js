const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config({ path: '../../config/.env' });

const API_KEY = process.env.ALPHA_VANTAGE_API_KEY;

// Función para obtener el precio actual de una acción
const getStockPrice = async (symbol) => {
    const url = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`;

    try {
        const response = await axios.get(url);
        const data = response.data;

        console.log(data);

        if (data.c !== undefined) {  // 'c' es el precio de cierre más reciente
            const latestPrice = data.c;
            return parseFloat(latestPrice);
        } else {
            throw new Error('No se encontraron datos de precios');
        }
    } catch (error) {
        const response = await axios.get(url);
        const data = response.data;
        console.error('Error al obtener el precio de la acción:', error.message);
        throw new Error('No se pudo obtener el precio de la acción' + data);
    }
};

// Función para buscar símbolos por nombre
const getSymbolSearch = async (name) => {
    const url = `https://finnhub.io/api/v1/search?q=${name}&token=${API_KEY}`;

    try {
        const response = await axios.get(url);
        const data = response.data;

        if (data.result && Array.isArray(data.result)) {
            // Filtra resultados que tengan un nombre válido
            return data.result
                .filter((item) => item.description && item.description.trim() !== '') // Asegúrate de que 'description' no sea nulo o vacío
                .map((item) => ({
                    symbol: item.symbol,       // Símbolo de la acción
                    name: item.description,    // Descripción de la empresa
                    type: item.type,           // Tipo de activo (Ej. stock, forex, etc.)
                }));
        } else {
            throw new Error('No se encontraron coincidencias');
        }
    } catch (error) {
        console.error('Error al obtener el nombre de la acción:', error.message);
        throw new Error('No se pudo obtener las acciones');
    }
};


const getStockChange = async (symbol) => {
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${API_KEY}`;

    try {
        const response = await axios.get(url);
        const data = response.data;

        console.log(data);

        if (!data['Time Series (5min)']) {
            throw new Error('Invalid response format');
        }

        const times = Object.keys(data['Time Series (5min)']);
        const latestTime = times[0];
        const previousTime = times[1];

        const latestPrice = parseFloat(data['Time Series (5min)'][latestTime]['4. close']);
        const previousPrice = parseFloat(data['Time Series (5min)'][previousTime]['4. close']);

        const percentageChange = ((latestPrice - previousPrice) / previousPrice) * 100;

        return { percentageChange };
    } catch (error) {
        console.error('Error al obtener el cambio porcentual:', error);
        throw new Error('No se pudo obtener el cambio porcentual');
    }
};

module.exports = { getStockPrice, getSymbolSearch, getStockChange };