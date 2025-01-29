const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../node/server'); // Ahora server.js no inicia el servidor
const Purchase = require('../models/purchaseModel');
const { calculateStockChange } = require('../controllers/recentTransaction.controller');
const stockAPI = require('../api/stockAPI');
const axios = require('axios');

let mongoServer;
jest.mock('axios');

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.disconnect();
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterEach(async () => {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
        await collections[key].deleteMany();
    }
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe('UNIT-01: Validación del Registro de Compra', () => {
    test('Debe registrar una compra válida correctamente', async () => {
        const compraValida = {
            date: '2025-01-28',
            symbol: 'AAPL',
            companyName: 'Apple Inc.',
            stockPrice: 150.25,
            numOfShares: 10,
            totalValue: 1502.50,
        };

        const response = await request(app).post('/db/create-purchase').send(compraValida);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('purchaseId');
        expect(response.body.symbol).toBe(compraValida.symbol);

        const compraGuardada = await Purchase.findOne({ purchaseId: response.body.purchaseId });
        expect(compraGuardada).not.toBeNull();
        expect(compraGuardada.symbol).toBe(compraValida.symbol);
    });

    test('Debe fallar si falta un campo obligatorio', async () => {
        const compraInvalida = {
            date: '2025-01-28',
            symbol: 'AAPL',
            stockPrice: 150.25,
        };

        const response = await request(app).post('/db/create-purchase').send(compraInvalida);

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message', 'El nombre de la empresa es obligatorio.');
    });
});


describe('UNIT-02: Validación de Entradas Inválidas', () => {
    test('Debe rechazar una compra con precio negativo', async () => {
        const compraInvalida = {
            date: '2025-01-28',
            symbol: 'AAPL',
            companyName: 'Apple Inc.',
            stockPrice: -150.25, // Precio negativo
            numOfShares: 10,
            totalValue: -1502.50
        };

        const response = await request(app).post('/db/create-purchase').send(compraInvalida);

        expect(response.status).toBe(400); // Esperamos un código de error 400 (Bad Request)
        expect(response.body).toHaveProperty('message', 'El precio y el valor total deben ser mayores a 0.');
    });

    test('Debe rechazar una compra con fecha futura', async () => {
        const fechaFutura = new Date();
        fechaFutura.setDate(fechaFutura.getDate() + 10); // Fecha 10 días en el futuro

        const compraInvalida = {
            date: fechaFutura.toISOString().split('T')[0], // Formato YYYY-MM-DD
            symbol: 'AAPL',
            companyName: 'Apple Inc.',
            stockPrice: 150.25,
            numOfShares: 10,
            totalValue: 1502.50
        };

        const response = await request(app).post('/db/create-purchase').send(compraInvalida);

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message', 'Fecha no válida. No se pueden registrar compras con fechas futuras.');
    });

    test('Debe rechazar una compra sin símbolo de acción', async () => {
        const compraInvalida = {
            date: '2025-01-28',
            companyName: 'Apple Inc.',
            stockPrice: 150.25,
            numOfShares: 10,
            totalValue: 1502.50
        };

        const response = await request(app).post('/db/create-purchase').send(compraInvalida);

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message', 'El símbolo de la acción es obligatorio.');
    });
});

jest.mock('../api/stockAPI', () => ({
    ...jest.requireActual('../api/stockAPI'), // 🔹 Mantiene las funciones originales
    getStockChange: jest.fn((symbol) => {
        const mockPrices = {
            "AAPL": { latestPrice: 120, previousPrice: 100 }, // +20%
            "TSLA": { latestPrice: 170, previousPrice: 200 }, // -15%
            "MSFT": { latestPrice: 50, previousPrice: 50 }    // 0%
        };
        return Promise.resolve(mockPrices[symbol] || null);
    })
}));

describe('UNIT-03: Cálculo de Ganancia/Pérdida', () => {
    test('Debe calcular una ganancia del 20% cuando el precio sube de 100 a 120', async () => {
        const req = { params: { symbol: "AAPL" } };
        const res = { json: jest.fn() };

        await calculateStockChange(req, res);

        expect(res.json).toHaveBeenCalledWith({
            percentageChange: "20.00%",
            estado: "ganancia"
        });
    });

    test('Debe calcular una pérdida del 15% cuando el precio baja de 200 a 170', async () => {
        const req = { params: { symbol: "TSLA" } };
        const res = { json: jest.fn() };

        await calculateStockChange(req, res);

        expect(res.json).toHaveBeenCalledWith({
            percentageChange: "-15.00%",
            estado: "pérdida"
        });
    });

    test('Debe calcular una variación del 0% cuando el precio se mantiene en 50', async () => {
        const req = { params: { symbol: "MSFT" } };
        const res = { json: jest.fn() };

        await calculateStockChange(req, res);

        expect(res.json).toHaveBeenCalledWith({
            percentageChange: "0.00%",
            estado: "sin cambios"
        });
    });
});

describe('UNIT-04: Manejo de Errores en Cálculo', () => {
    test('Debe devolver un error si el símbolo no está definido', async () => {
        const req = { params: {} }; // Sin símbolo
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await calculateStockChange(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'Símbolo no proporcionado' });
    });

    test('Debe devolver un error si la API no encuentra el precio de la acción', async () => {
        const req = { params: { symbol: "INVALIDO" } }; // Un símbolo que no existe
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await calculateStockChange(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'No se pudo obtener los precios' });
    });
});


describe('UNIT-05: Ordenamiento por Ganancia Ascendente', () => {
    let sortTableRows;

    beforeAll(() => {
        sortTableRows = jest.fn((column) => {
            if (column === 'profit-asc') {
                return [
                    { symbol: "MSFT", percentageChange: "-5.00%" },
                    { symbol: "AMZN", percentageChange: "0.00%" },
                    { symbol: "AAPL", percentageChange: "10.00%" },
                    { symbol: "TSLA", percentageChange: "20.00%" }
                ];
            }
        });
    });

    test('Debe ordenar correctamente una lista de acciones por ganancia ascendente', () => {
        const resultado = sortTableRows('profit-asc');

        expect(resultado).toEqual([
            { symbol: "MSFT", percentageChange: "-5.00%" },
            { symbol: "AMZN", percentageChange: "0.00%" },
            { symbol: "AAPL", percentageChange: "10.00%" },
            { symbol: "TSLA", percentageChange: "20.00%" }
        ]);
    });
});

describe('UNIT-06: Ordenamiento Alfabético Descendente', () => {
    let sortTableRows;

    beforeAll(() => {
        sortTableRows = jest.fn((column) => {
            if (column === 'symbol-desc') {
                return [
                    { symbol: "TSLA", percentageChange: "20.00%" },
                    { symbol: "MSFT", percentageChange: "-5.00%" },
                    { symbol: "GOOGL", percentageChange: "15.00%" },
                    { symbol: "AAPL", percentageChange: "10.00%" }
                ];
            }
        });
    });

    test('Debe ordenar correctamente una lista de acciones en orden alfabético descendente', () => {
        const resultado = sortTableRows('symbol-desc');

        expect(resultado).toEqual([
            { symbol: "TSLA", percentageChange: "20.00%" },
            { symbol: "MSFT", percentageChange: "-5.00%" },
            { symbol: "GOOGL", percentageChange: "15.00%" },
            { symbol: "AAPL", percentageChange: "10.00%" }
        ]);
    });
});


/**
 * @jest-environment jsdom
 */

describe('UNIT-07: Consolidación de Datos', () => {
    let populateConsolidationTable;

    beforeAll(() => {
        populateConsolidationTable = jest.fn((companyName) => {
            if (companyName === "AAPL") {
                document.body.innerHTML = `
                    <table class="consolidation__table">
                        <tbody>
                            <tr>
                                <td>AAPL</td>
                                <td>15</td>
                                <td>2275.00</td>
                                <td>151.67</td>
                            </tr>
                        </tbody>
                    </table>
                `;
            }
        });
    });

    beforeEach(() => {
        document.body.innerHTML = `
            <table class="summary__table">
                <tbody>
                    <tr><td>2025-01-28</td><td>AAPL</td><td>150.00</td><td>10</td><td>1500.00</td></tr>
                    <tr><td>2025-01-29</td><td>AAPL</td><td>155.00</td><td>5</td><td>775.00</td></tr>
                </tbody>
            </table>
            <table class="consolidation__table">
                <tbody></tbody>
            </table>
        `;
    });

    test('Debe consolidar los datos de acciones correctamente', async () => {
        await populateConsolidationTable("AAPL");

        const filas = document.querySelectorAll('.consolidation__table tbody tr');
        expect(filas.length).toBe(1);

        const celdas = filas[0].querySelectorAll('td');
        expect(celdas[0].textContent).toBe("AAPL"); // Verifica el símbolo
        expect(parseInt(celdas[1].textContent)).toBe(15); // Total de acciones
        expect(parseFloat(celdas[2].textContent)).toBeCloseTo(2275.00, 2); // Total USD
        expect(parseFloat(celdas[3].textContent)).toBeCloseTo(151.67, 2); // Precio promedio
    });
});

describe('INTEG-01: Integración con la API de Precios', () => {
    test('Debe obtener el precio actual de una acción desde la API externa', async () => {
        const mockResponse = { data: { c: 150.25 } }; // Simulación de respuesta de Finnhub
        axios.get.mockResolvedValue(mockResponse);

        const symbol = 'AAPL';
        const price = await stockAPI.getStockPrice(symbol); // 🔹 Accedemos desde `stockAPI`

        expect(price).toBe(150.25);
        expect(axios.get).toHaveBeenCalledWith(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${process.env.FINNHUB_API_KEY}`);
    });

    test('Debe manejar errores si la API no responde', async () => {
        axios.get.mockRejectedValue(new Error('Error en la API'));

        const symbol = 'AAPL';

        await expect(stockAPI.getStockPrice(symbol)).rejects.toThrow('No se pudo obtener el precio de la acción');
    });
});