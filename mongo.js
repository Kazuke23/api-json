const { MongoClient } = require('mongodb');
require('dotenv').config();

// Usar directamente la URI que proporcionaste
const uri = process.env.MONGO_URI || 'mongodb://atlas-sql-6647594de817fe271accc3c6-ikd9x.a.query.mongodb.net/sample_mflix?ssl=true&authSource=admin';

const client = new MongoClient(uri);

const validatedb = async () => {
  try {
    await client.connect();
    console.log('Conexión exitosa a MongoDB Atlas');
  } catch (error) {
    console.error('Error conectando a MongoDB Atlas:', error);
  }
}

validatedb();

module.exports = client;
