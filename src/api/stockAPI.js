const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config({ path: '../../config/.env' });

const API_KEY = process.env.FINNHUB_API_KEY;

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

// Funcion para buscar el nombre de la empresa por el símbolo
const getOneSymbolSearch = async (symbol) => {
    const url = `https://finnhub.io/api/v1/search?q=${symbol}&token=${API_KEY}`;

    try {
        const response = await axios.get(url);
        const data = response.data;

        if (data.result && Array.isArray(data.result)) {
            // Busca el resultado que coincida exactamente con el símbolo
            const exactMatch = data.result.find((item) => item.symbol === symbol);

            if (exactMatch) {
                return {
                    name: exactMatch.description,    // Descripción de la empresa
                };
            } else {
                throw new Error('No se encontró una coincidencia exacta para el símbolo');
            }
        } else {
            throw new Error('No se encontraron resultados');
        }
    } catch (error) {
        console.error('Error al buscar el símbolo:', error.message);
        throw new Error('No se pudo obtener el símbolo');
    }
};

// Funcion para obtener el cambio de precio de una acción
const getStockChange = async (symbol) => {

    const url = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`;

    try {
        const response = await axios.get(url);
        const data = response.data;

        if (!data || !data.c || !data.pc) {
            throw new Error('Invalid response format');
        }

        const latestPrice = data.c; // Último precio actual
        const previousPrice = data.pc; // Precio de cierre previo

        return { latestPrice, previousPrice };
    } catch (error) {
        console.error('Error al obtener los precios:', error);
        throw new Error('No se pudo obtener los precios');
    }
};


module.exports = { getStockPrice, getSymbolSearch, getOneSymbolSearch, getStockChange };