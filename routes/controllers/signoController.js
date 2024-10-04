const fs = require('fs/promises');
const path = require('path');

// Ruta del archivo de credenciales
const credencialesPath = path.join(__dirname, '../../db/credenciales.json');

// Función para cargar los usuarios desde el archivo JSON
const loadUsers = async () => {
    const data = await fs.readFile(credencialesPath, 'utf-8');
    return JSON.parse(data).users;
};

// Función para guardar los usuarios en el archivo JSON
const saveUsers = async (users) => {
    const data = { users };
    await fs.writeFile(credencialesPath, JSON.stringify(data, null, 2), { encoding: 'utf-8' });
};

// Obtener todos los signos
const getAllSignos = async (req, res) => {
    const signo = await fs.readFile(path.join(__dirname, '../../db/signos.json'));
    const signosJson = JSON.parse(signo);
    res.json(signosJson);
};

// Obtener un signo específico
const getOneSigno = async (req, res) => {
    const oneSigno = req.params.signo;
    const allSignos = await fs.readFile(path.join(__dirname, '../../db/signos.json'));
    const objSignos = JSON.parse(allSignos);
    const result = objSignos[oneSigno];
    res.json(result);
};

// Actualizar un signo
const updateSigno = async (req, res) => {
    const signoEditar = req.params.signoEditar;
    const { textoEditar } = req.body;
    const allSignos = await fs.readFile(path.join(__dirname, '../../db/signos.json'));
    const objSignos = JSON.parse(allSignos);

    const objUpdate = {
        ...objSignos,
        [signoEditar]: textoEditar
    };

    await fs.writeFile(path.join(__dirname, '../../db/signos.json'), JSON.stringify(objUpdate, null, 2), { encoding: 'utf-8' });

    res.json({
        message: 'Updated'
    });
};

// Manejar el login
const calculeLogin = async (req, res) => {
    const { username, password } = req.body;

    console.log("recibi user: " + username);
    console.log("recibi pass: " + password);

    const users = await loadUsers();
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        res.json({
            resultado: "success",
            message: "Login exitoso"
        });
    } else {
        res.json({
            resultado: "error",
            message: "Usuario o contraseña incorrectos"
        });
    }
};

// Registrar un nuevo usuario
const register = async (req, res) => {
    const { username, password } = req.body;
    const users = await loadUsers();

    const existingUser = users.find(u => u.username === username);
    if (existingUser) {
        return res.status(400).json({ message: 'El usuario ya existe' });
    }

    users.push({ username, password });
    await saveUsers(users);
    res.status(201).json({ message: 'Usuario registrado exitosamente' });
};

// Restablecer la contraseña de un usuario
const resetPassword = async (req, res) => {
    const { username, newPassword } = req.body;
    const users = await loadUsers();

    const user = users.find(u => u.username === username);
    if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    user.password = newPassword;
    await saveUsers(users);
    res.status(200).json({ message: 'Contraseña restablecida exitosamente' });
};

module.exports = {
    getAllSignos,
    getOneSigno,
    updateSigno,
    calculeLogin,
    register,          // Añadimos la función de registro
    resetPassword      // Añadimos la función de restablecer contraseña
};
