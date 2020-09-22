const Usuario = require("../models/Usuario");
const bcriptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
exports.autenticarUsuario = async (req, res) => {
  const { email, password } = req.body;

  try {
    //revisar que haya un usuario registrado con el elmail

    let usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(400).json({ msg: "El usuario no existe auth" });
    }

    //Revisar el password

    const passCorrecto = await bcriptjs.compare(password, usuario.password);
    if (!passCorrecto) {
      return res.status(400).json({
        msg: "Password Incorrecto",
      });
    }

    //Si todo es correcto Crear y firmar el JWT
    const payload = {
      usuario: {
        id: usuario.id,
      },
    };
    //firmar el token
    jwt.sign(
      payload,
      process.env.SECRETA,
      {
        expiresIn: 360000,
      },
      (error, token) => {
        if (error) {
          throw error;
        }
        //mensaje de confirmacion
        res.json({ msg: "usuario autenticado correctamente", token });
      }
    );
  } catch (error) {
    console.log(error.msg);
    res.status(500).json({ msg: "Ocurrio un error al autenticar" });
  }
};

exports.usuarioAutenticado = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.usuario.id).select("-password");

    res.json({ msg: "Usuario extraido correctamente", usuario });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Ocurrio un error al autenticar" });
  }
};
