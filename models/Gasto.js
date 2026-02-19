const mongoose = require('mongoose');

const gastoSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    tipo: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    usuario: {
        type: String,
        required: true
    },
    fecha: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Gasto', gastoSchema);