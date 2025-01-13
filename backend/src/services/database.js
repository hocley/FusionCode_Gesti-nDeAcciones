const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: '../config/.env' });

const connectDB = async () => {
    try {
        // Conexión sin las opciones deprecated
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Conexión a MongoDB exitosa');
    } catch (error) {
        console.error('Error al conectar con MongoDB:', error);
        process.exit(1); // Termina el proceso si la conexión falla
    }
};

module.exports = connectDB;
