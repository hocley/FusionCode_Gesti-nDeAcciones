const axios = require('axios');

const purchaseData = {
    symbol: 'AAPL',
    companyName: 'Apple Inc.',
    stockPrice: 175.00,
    numOfShares: 50,
    totalValue: 8750.00,
};

/*// URL del servidor local
const url = 'http://localhost:3000/db/purchase';

// Enviar la solicitud POST para crear una compra
axios.post(url, purchaseData)
    .then(response => {
        console.log('Compra insertada con éxito');
    })
    .catch(error => {
        console.error('Error al insertar la compra:', error.response ? error.response.data : error.message);
    });
*/

// ID de la compra que deseas eliminar
const purchaseId = '2833CB';

axios.delete(`http://localhost:3000/db/delete-purchase/${purchaseId}`)
    .then(response => {
        console.log('Compra eliminada con éxito:');
    })
    .catch(error => {
        console.error('Error al eliminar la compra:', error.response ? error.response.data : error.message);
    });
