/**
 * Módulo para interactuar con la API de Finnhub
 */
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config({ path: '../../config/.env' });

const API_KEY = process.env.FINNHUB_API_KEY; // Clave de API para autenticación

/**
 * Obtiene el precio actual de una acción
 * @param {string} symbol - Símbolo de la acción
 * @returns {Promise<number>} - Precio actual de la acción
 * @throws {Error} - Si no se puede obtener el precio de la acción
 */
const getStockPrice = async (symbol) => {
    const url = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`;

    try {
        const response = await axios.get(url);
        const data = response.data;

        if (data.c !== undefined) {
            return parseFloat(data.c);
        } else {
            throw new Error('No se encontraron datos de precios');
        }
    } catch (error) {
        console.error('Error al obtener el precio de la acción:', error.message);
        throw new Error('No se pudo obtener el precio de la acción'); // 🔹 Eliminamos `data`
    }
};


/**
 * Busca el nombre de la empresa por el símbolo
 * @param {string} symbol - Símbolo de la acción
 * @returns {Promise<Object>} - Nombre de la empresa
 * @throws {Error} - Si no se puede obtener el símbolo
 */
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

/**
 * Obtiene el cambio de precio de una acción
 * @param {string} symbol - Símbolo de la acción
 * @returns {Promise<Object>} - Último precio y precio de cierre previo
 * @throws {Error} - Si no se pueden obtener los precios
 */
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


// Exporta las funciones del módulo
module.exports = { getStockPrice, getOneSymbolSearch, getStockChange };