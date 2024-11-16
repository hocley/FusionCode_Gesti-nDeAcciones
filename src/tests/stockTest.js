const axios = require('axios');

// URL del servidor local (suponiendo que Express está corriendo en el puerto 3000)
const apiUrl = 'http://localhost:3000/api/stock/';

const testStockRoute = async () => {
    const symbol = 'AAPL';  // Símbolo de la acción (Apple, por ejemplo)

    try {
        const response = await axios.get(`${apiUrl}${symbol}`);
        console.log(`Respuesta de la API: ${JSON.stringify(response.data)}`);
    } catch (error) {
        console.error('Error en la solicitud de la ruta:', error);
    }
};

//testStockRoute();