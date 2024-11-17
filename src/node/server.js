const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('../services/database'); // Asegúrate de que la conexión a MongoDB esté en este archivo
const stockRoutes = require('../routes/stockRoutes');
const purchaseRoutes = require('../routes/purchaseRoutes');

// Cargar las variables de entorno
dotenv.config({ path: '../../config/.env' });

const app = express();

// Middleware para leer el cuerpo de las solicitudes como JSON
app.use(express.json());

// Usar las rutas de las compras
app.use('/api', stockRoutes);
app.use('/db', purchaseRoutes)

// Conectar a la base de datos de MongoDB
connectDB();

// Iniciar el servidor en el puerto 3000
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});
