const mongoose = require('mongoose');
const User = require('../models/User'); // Suponiendo que tienes un modelo de Usuario

exports.register = async (req, res) => {
  try {
    // Verificar si el cuerpo de la solicitud tiene los datos necesarios
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'El usuario ya está registrado.' });
    }

    // Crear el nuevo usuario
    const newUser = new User({ name, email, password });

    // Guardar el usuario en la base de datos
    await newUser.save();

    res.status(201).json({ message: 'Usuario registrado exitosamente.', user: newUser });
  } catch (error) {
    console.error('Error registrando el usuario:', error);
    res.status(500).json({ error: 'Hubo un error en el servidor, por favor intenta de nuevo.' });
  }
};
