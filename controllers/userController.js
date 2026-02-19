const User = require("../models/User");
const jwt = require("jsonwebtoken");
const CryptoJS = require('crypto-js');

exports.crearUsuario = async (req, res) => {
    try {
        let user;
        user = new User(req.body);
        const pass = CryptoJS.enc.Utf16.parse(user.password);
        user.password = CryptoJS.enc.Base64.stringify(pass);
        await user.save();
        const token = jwt.sign({ _id: user._id }, "secretKey");
        res.status(200).json({ token: token });
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error...');
    }
}

exports.actualizarUsuario = async (req, res) => {
    try {
        const { nombres, apellidos, correo, password } = req.body;
        let user = await User.findById(req.params.id);
        if (!user){
            res.status(404).json({ msg: 'El usuario no existe.' });
        }
        user.nombres = nombres;
        user.apellidos = apellidos;
        user.correo = correo;
        const pass = CryptoJS.enc.Utf16.parse(password);
        user.password = CryptoJS.enc.Base64.stringify(pass);
        user = await User.findOneAndUpdate({ _id: req.params.id }, user, { new: true });
        const token = jwt.sign({ _id: user._id }, "secretKey");
        return res.status(200).json({ token: token });
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error...');
    }
}

exports.loginUsuario = async (req, res) => {
    try {
        let { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user){
            return res.status(401).send('El email no existe.');
        }
        const pass = CryptoJS.enc.Utf16.parse(password);
        password = CryptoJS.enc.Base64.stringify(pass);
        if (password == user.password){
            const token = jwt.sign({ _id: user._id }, "secretKey");
            return res.status(200).json({ token: token });
        } else {
            return res.status(401).send('Contraseña incorrecta.');
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error...');
    }
}

exports.verifyToken = async (req, res, next) => {
    if (!req.headers.authorization){
        return res.status(401).send('Solicitud no autorizada.');
    }
    const token = req.headers.authorization.split(' ')[1];
    if (token === 'null'){
        return res.status(401).send('Solicitud no autorizada.');
    }
    const data = jwt.verify(token, 'secretKey');
    req.userId = data._id;
    next();
}

exports.getUsuario = async (req, res) => {
    try {
        let user = await User.findById(req.params.id);
        const pass = CryptoJS.enc.Base64.parse(user.password);
        user.password = CryptoJS.enc.Utf16.stringify(pass);
        if (!user){
            res.status(404).json({ msg: 'El usuario no existe.' });
        }
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error...');
    }
}

exports.getEmail = async (req, res) => {
    try {
        const email = req.body.email;
        const user = await User.findOne({ email });
        if (user){
            res.send(true);
        } else {
            res.send(false);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error...');
    }
}