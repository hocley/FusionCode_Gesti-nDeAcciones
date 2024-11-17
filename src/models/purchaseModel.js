const mongoose = require('mongoose');

// Definición del esquema para las compras de acciones
const purchaseSchema = new mongoose.Schema({
    purchaseId: {
        type: String,
        required: true,
        unique: true,
    },
    symbol: {
        type: String,
        required: true,
    },
    companyName: {
        type: String,
        required: true,
    },
    stockPrice: {
        type: Number,
        required: true,
    },
    numOfShares: {
        type: Number,
        required: true,
    },
    totalValue: {
        type: Number,
        required: true,
    },
}, {
    collection: 'purchases'
});

// Crear el modelo con el nombre 'Purchase' y asociarlo con la colección 'stocks'
const Purchase = mongoose.model('Purchase', purchaseSchema);

module.exports = Purchase;