const Usuario = require("../models/Usuario");
const bcriptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.crearUsuario = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  const { email, password, username } = req.body;

  //Validamos que el usuario y correo sean unicos

  try {
    let uniqueEmail = await Usuario.findOne({ email });
    let uniqueUsername = await Usuario.findOne({ username });
    if (uniqueUsername) {
      return res.status(400).json({ msg: "El usuario ya existe" });
    }
    if (uniqueEmail) {
      return res.status(400).json({ msg: "El correo ya está registrado" });
    }
    //crear el nuevo usuario

    let usuario = new Usuario(req.body);

    //Hashear el password

    const salt = await bcriptjs.genSalt(10);

    usuario.password = await bcriptjs.hash(password, salt);

    await usuario.save();

    //Crear y firmar un JWT

    const payload = {
      usuario: {
        id: usuario.id,
      },
    };
    jwt.sign(
      payload,
      process.env.SECRETA,
      {
        expiresIn: 3600,
      },
      (error, token) => {
        if (error) {
          throw error;
        }
        //mensaje de confirmacion
        res.json({ msg: "Usuario agregado correctamente", token });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).send("Hubo un error");
  }
};
