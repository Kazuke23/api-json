const { MongoClient } = require('mongodb');

// URL de tu MongoDB Atlas (si ya tienes la conexión exitosa)
const uri = "mongodb://atlas-sql-6647594de817fe271accc3c6-ikd9x.a.query.mongodb.net/sample_mflix?ssl=true&authSource=admin";

// Función para conectarse a la base de datos
const connectDB = async () => {
    const client = new MongoClient(uri);
    await client.connect();
    const database = client.db('horoscopo'); // Reemplaza con el nombre de tu base de datos
    return { client, database };
};

// Obtener todos los signos
const getAllSignos = async (req, res) => {
    const { client, database } = await connectDB();
    const collection = database.collection('signos');

    const signos = await collection.find({}).toArray();
    await client.close();

    res.json(signos);
};

// Obtener un signo específico
const getOneSigno = async (req, res) => {
    const { client, database } = await connectDB();
    const collection = database.collection('signos');
    const oneSigno = req.params.signo;

    const signo = await collection.findOne({ nombre: oneSigno });
    await client.close();

    if (signo) {
        res.json(signo);
    } else {
        res.status(404).json({ message: 'Signo no encontrado' });
    }
};

// Actualizar un signo
const updateSigno = async (req, res) => {
    const { client, database } = await connectDB();
    const collection = database.collection('signos');
    const signoEditar = req.params.signoEditar;
    const { textoEditar } = req.body;

    const result = await collection.updateOne(
        { nombre: signoEditar },
        { $set: { texto: textoEditar } }
    );
    
    await client.close();

    if (result.matchedCount > 0) {
        res.json({ message: 'Updated' });
    } else {
        res.status(404).json({ message: 'Signo no encontrado' });
    }
};

// Manejar el login
const calculeLogin = async (req, res) => {
    const { client, database } = await connectDB();
    const collection = database.collection('users');
    const { username, password } = req.body;

    const user = await collection.findOne({ username, password });
    await client.close();

    if (user) {
        res.json({ resultado: "success", message: "Login exitoso" });
    } else {
        res.status(400).json({ resultado: "error", message: "Usuario o contraseña incorrectos" });
    }
};

// Registrar un nuevo usuario
const register = async (req, res) => {
    const { client, database } = await connectDB();
    const collection = database.collection('users');
    const { username, password } = req.body;

    const existingUser = await collection.findOne({ username });
    if (existingUser) {
        await client.close();
        return res.status(400).json({ message: 'El usuario ya existe' });
    }

    await collection.insertOne({ username, password });
    await client.close();

    res.status(201).json({ message: 'Usuario registrado exitosamente' });
};

// Restablecer la contraseña de un usuario
const resetPassword = async (req, res) => {
    const { client, database } = await connectDB();
    const collection = database.collection('users');
    const { username, newPassword } = req.body;

    const user = await collection.findOne({ username });
    if (!user) {
        await client.close();
        return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    await collection.updateOne({ username }, { $set: { password: newPassword } });
    await client.close();

    res.status(200).json({ message: 'Contraseña restablecida exitosamente' });
};

module.exports = {
    getAllSignos,
    getOneSigno,
    updateSigno,
    calculeLogin,
    register,
    resetPassword
};
