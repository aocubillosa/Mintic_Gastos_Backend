const Gasto = require("../models/Gasto");

exports.crearGasto = async (req, res) => {
    try {
        let gasto;
        req.body.usuario = req.userId;
        gasto = new Gasto(req.body);
        await gasto.save();
        res.send(gasto);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error...');
    }
}

exports.obtenerGastos = async (req, res) => {
    try {
        const gastos = await Gasto.find({ usuario: req.userId });
        res.json(gastos);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error...');
    }
}

exports.actualizarGasto = async (req, res) => {
    try {
        const { nombre, tipo, precio } = req.body;
        let gasto = await Gasto.findById(req.params.id);
        if (!gasto){
            res.status(404).json({ msg: 'El gasto no existe.' });
        }
        gasto.nombre = nombre;
        gasto.tipo = tipo;
        gasto.precio = precio;
        gasto = await Gasto.findOneAndUpdate({ _id: req.params.id }, gasto, { new: true });
        res.json(gasto);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error...');
    }
}

exports.obtenerGasto = async (req, res) => {
    try {
        let gasto = await Gasto.findById(req.params.id);
        if (!gasto){
            res.status(404).json({ msg: 'El gasto no existe.' });
        }
        res.json(gasto);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error...');
    }
}

exports.eliminarGasto = async (req, res) => {
    try {
        let gasto = await Gasto.findById(req.params.id);
        if (!gasto){
            res.status(404).json({ msg: 'El gasto no existe.' });
        }
        await Gasto .findOneAndRemove({ _id: req.params.id });
        res.json({ msg: 'Gasto eliminado correctamente.' });
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error...');
    }
}