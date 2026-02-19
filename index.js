const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');
const app = express();

conectarDB();

app.use(cors());
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use('/api/gastos', require('./routes/gasto'));
app.use('/api/users', require('./routes/user'));
app.listen(4000, () => {
    console.log('Servidor conectado...');
});