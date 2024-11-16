const express = require('express');
const dotenv = require('dotenv');
const stockRoutes = require('../routes/stockRoutes');

// Load environment variables from .env file
dotenv.config({ path: '../../config/.env' });

const app = express();

app.use(express.json());
app.use('/api', stockRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});