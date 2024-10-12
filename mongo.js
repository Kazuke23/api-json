const { MongoClient } = require('mongodb');
require('dotenv').config(); // Cargar variables de entorno

const uri = process.env.MONGO_URI; // Obtener el URI desde el archivo .env

const client = new MongoClient(uri);

const connectDB = async () => {
  try {
    await client.connect();
    console.log('Conectado a MongoDB local exitosamente');
  } catch (error) {
    console.error('Error conectando a MongoDB:', error);
  }
};

module.exports = { client, connectDB };
