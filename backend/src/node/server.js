const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('../services/database');
const stockRoutes = require('../routes/api.route');
const purchaseRoutes = require('../routes/database.route');
const searchRoutes = require('../routes/python.route'); // Importar searchRoutes

// Cargar las variables de entorno
dotenv.config({ path: '../../config/.env' });

const app = express();

// Middleware para leer el cuerpo de las solicitudes como JSON
app.use(express.json());

// Habilitar CORS para todas las rutas
app.use(cors());

// Usar las rutas
app.use('/api', stockRoutes);
app.use('/db', purchaseRoutes);
app.use('/py', searchRoutes);

// Conectar a la base de datos de MongoDB
connectDB();

// Iniciar el servidor en el puerto 3000
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});
