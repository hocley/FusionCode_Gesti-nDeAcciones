const axios = require('axios');

// URL del servidor local (suponiendo que Express está corriendo en el puerto 3000)

const testStockRoute = async () => {

    const apiUrl = 'http://localhost:3000/api/stock/';
    const symbol = 'AAPL';  // Símbolo de la acción (Apple, por ejemplo)

    try {
        const response = await axios.get(`${apiUrl}${symbol}`);
        console.log(`Respuesta de la API: ${JSON.stringify(response.data)}`);
    } catch (error) {
        console.error('Error en la solicitud de la ruta:', error);
    }
};

const testSearchRoute = async () => {

    const apiUrl = 'http://localhost:3000/api/search/';
    const text = 'samsu';  // Símbolo de la acción (Apple, por ejemplo)

    try {
        const response = await axios.get(`${apiUrl}${text}`);
        console.log(`Respuesta de la API: ${JSON.stringify(response.data)}`);
    } catch (error) {
        console.error('Error en la solicitud de la ruta:', error);
    }
};

const testStockChangeRoute = async (symbol) => {
    try {
        const response = await axios.get(`http://localhost:3000/api/stock-change/${symbol}`);
        console.log(`Cambio porcentual: ${response.data.percentageChange}%`); // Muestra el cambio porcentual
    } catch (error) {
        console.error('Error al obtener el cambio porcentual:', error);
    }
};

testStockRoute();
//testStockChangeRoute('AAPL');