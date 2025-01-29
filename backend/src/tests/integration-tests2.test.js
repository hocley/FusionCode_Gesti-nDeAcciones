const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const request = require('supertest');
const express = require('express');
const Purchase = require('../models/purchaseModel');
const databaseRoutes = require('../routes/database.route'); // 🔹 Importa las rutas manualmente

let mongoServer;
let app;

// 🔹 Configurar Express manualmente para las pruebas
beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();

    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(mongoServer.getUri(), { useNewUrlParser: true, useUnifiedTopology: true });
    }

    // 🔹 Crear una instancia de Express y registrar las rutas
    app = express();
    app.use(express.json());
    app.use('/db', databaseRoutes); // 🔹 Agregar rutas manualmente
});

// 🔹 Limpiar la base de datos después de cada prueba
afterEach(async () => {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
        await collections[key].deleteMany({});
    }
});

// 🔹 Cerrar la conexión después de todas las pruebas
afterAll(async () => {
    await mongoose.connection.close();
    if (mongoServer) {
        await mongoServer.stop();
    }
});

// 🔹 Prueba de Integración 3: Consolidación de Datos en el Portafolio
describe('INTEG-03: Integración con la Base de Datos', () => {
    test('Debe consolidar correctamente los datos del portafolio', async () => {
        // 🔹 Insertar múltiples compras en la base de datos simulada
        await Purchase.create([
            { purchaseId: "P001", date: "2025-01-28", symbol: "AAPL", companyName: "Apple Inc.", stockPrice: 150, numOfShares: 10, totalValue: 1500 },
            { purchaseId: "P002", date: "2025-01-29", symbol: "AAPL", companyName: "Apple Inc.", stockPrice: 155, numOfShares: 5, totalValue: 775 },
            { purchaseId: "P003", date: "2025-01-30", symbol: "TSLA", companyName: "Tesla Inc.", stockPrice: 200, numOfShares: 8, totalValue: 1600 }
        ]);

        // 🔹 Hacer una solicitud a la API de consolidación usando `companyName`
        const response = await request(app).get('/db/get-purchases-name/Apple Inc.');

        console.log('Response:', response.body); // 🔹 Verifica qué datos está devolviendo la API

        // 🔹 Verificar que la API responde correctamente
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('totalShares', 15);
        expect(response.body).toHaveProperty('totalValue', 2275);
        expect(response.body).toHaveProperty('averagePrice');
        expect(response.body.averagePrice).toBeCloseTo(151.67, 2); // Verificar el promedio esperado
    });
});

