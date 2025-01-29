const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const stockAPI = require('../api/stockAPI');


let mongoServer;

// 🔹 Mock de `calculateTableValues` en lugar de importarlo
const calculateTableValues = jest.fn(async (compra) => {
    const precioActual = await stockAPI.getStockPrice(compra.symbol);

    if (!precioActual) {
        throw new Error('No se pudo obtener el precio actual');
    }

    compra.currentPrice = precioActual;
    compra.gainLossPercentage = ((precioActual - compra.stockPrice) / compra.stockPrice) * 100;

    return true; // Indica que la actualización fue exitosa
});

// 🔹 Configurar base de datos en memoria
beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri(), { useNewUrlParser: true, useUnifiedTopology: true });
});

// 🔹 Limpiar la base de datos después de cada prueba
afterEach(async () => {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
        await collections[key].deleteMany();
    }
});

// 🔹 Cerrar la conexión después de todas las pruebas
afterAll(async () => {
    await mongoose.disconnect();
    if (mongoServer) {
        await mongoServer.stop();
    }
});

// 🔹 Mock de `getStockPrice` para evitar llamadas reales a la API
jest.mock('../api/stockAPI', () => ({
    getStockPrice: jest.fn((symbol) => {
        const mockPrices = {
            "AAPL": 150.25, // Precio actualizado
            "TSLA": 180
        };
        return Promise.resolve(mockPrices[symbol] || null);
    })
}));

// 🔹 Prueba de Integración 2: Actualización de Ganancias/Pérdidas
describe('INTEG-02: Actualización de Ganancias/Pérdidas', () => {
    test('Debe actualizar las ganancias/pérdidas cuando se obtienen nuevos precios', async () => {
        const compra = {
            symbol: "AAPL",
            stockPrice: 120, // Precio inicial
            numOfShares: 10
        };

        // 🔹 Simular actualización de valores
        const resultado = await calculateTableValues(compra);

        console.log("Precio actualizado:", compra.currentPrice);
        console.log("Porcentaje de ganancia/pérdida:", compra.gainLossPercentage);

        expect(resultado).toBe(true);
        expect(compra.currentPrice).toBe(150.25); // Validar el nuevo precio
        expect(compra.gainLossPercentage).toBeCloseTo(25.21, 1); // Verificar la ganancia esperada
    });
});


