const express = require('express');
const { urlencoded, json } = require('express');
const router = require('./routes/signos.routes.js'); // Asegúrate que este archivo contiene las rutas correctas
const cors = require('cors');

const app = express();

// Middlewares
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(cors());

// Responder a las solicitudes preflight OPTIONS
app.options('*', cors());

// Usar el router para las rutas principales de la API
app.use('/v1/signos', router);

// Ruta raíz opcional
app.get('/', (req, res) => {
  res.send('Bienvenido a la API de Signos');
});

// Ruta adicional para manejar errores 404
app.use((req, res) => {
  res.status(404).send('Ruta no encontrada');
});

// Manejo global de errores (opcional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo salió mal');
});

// Exportar la aplicación
module.exports = app;
