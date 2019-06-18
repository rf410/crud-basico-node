const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');

// ========== Importando rutas ==========
const indexRouter = require('./routes/index');
// ======================================



// ========== Configuraciones ==========

// Puerto en el que correra la aplicación
const puerto = process.env.PORT || 3000;

// Se define la ruta de views para que el servidor sepa donde estan
app.set('views', path.join(__dirname, 'views'));

// Motor de plantillas 
app.set('view engine', 'ejs');

// Conectando a mongoDB
mongoose.connect('mongodb://localhost/crud-mongo', { useNewUrlParser: true })
    .then(db => console.log(`Base de datos conectada`))
    .catch(err => console.log(err));
// =====================================



// ========== Middleware ==========
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
// ================================



// ========== rutas ==========
app.use('/', indexRouter);
// ===========================


// Iniciando el servidor
app.listen(puerto, () => {
    console.log(`Servidor en el puerto ${puerto}`);
});