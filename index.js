const express = require('express');
const { urlencoded, json } = require('express');
const router = require('./routes/signos.routes.js');
const cors = require('cors');

const app = express();

app.use(urlencoded({ extended: true }));
app.use(json());
app.use(cors());

// Responder a las solicitudes preflight OPTIONS
app.options('*', cors());

// Usar el router
app.use('/v1/signos', router);

// Si deseas agregar una ruta para la raíz
app.get('/', (req, res) => {
  res.send('Bienvenido a la API de Signos');
});

// Exportar la aplicación
module.exports = app;
