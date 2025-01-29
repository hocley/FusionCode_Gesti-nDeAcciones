const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('../services/database');
const stockRoutes = require('../routes/api.route');
const purchaseRoutes = require('../routes/database.route');
const searchRoutes = require('../routes/python.route');
const path = require("path");

dotenv.config({ path: path.resolve(__dirname, '../config/.env') });

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api', stockRoutes);
app.use('/db', purchaseRoutes);
app.use('/py', searchRoutes);

connectDB();

// Solo iniciar el servidor si NO estamos en pruebas
if (process.env.NODE_ENV !== 'test') {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Servidor ejecutándose en el puerto ${PORT}`);
    });
}

module.exports = app;
