const express = require('express');
const {urlencoded, json} = require('express');
const router = require('./routes/signos.routes.js');
const cors = require('cors');

const app = express();

app.use(urlencoded({extended: true}))
app.use(json())

app.use(cors())

// Responder a las solicitudes preflight OPTIONS
app.options('*', cors());

app.use('/v1/signos', router);

module.exports = app;