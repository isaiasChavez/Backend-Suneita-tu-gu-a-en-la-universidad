const Renta = require("../models/Rentas");
const { validationResult } = require("express-validator");
const Usuario = require("../models/Usuario");

exports.crearRenta = (req, res) => {
  console.log(req.body);
  //Revisar si hay errores
  const errores = validationResult(req);
  console.log(errores, "los errores");
  if (!errores.isEmpty()) {
    console.log(errores.array());
    return res.status(400).json({ errores: errores.array() });
  }

  try {
    //Crear un nuevo poyecto
    const renta = new Renta(req.body);

    //Guardar el creador via JWT, el que está autenticado

    renta.creador = req.usuario.id;

    renta.save();
    console.log("Creo que se ha guardado bien");
    res.json({ msg: "Se ha publicado con exito", renta });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).send("Hubo un error");
  }
};

//Obtiene todos los proyectos del usuario que se encuentra autenticado
exports.obtenerRentasUsuario = async (req, res) => {
  try {
    const rentas = await Renta.find({ creador: req.usuario.id }).sort({
      creador: -1,
    });
    res.json({ rentas });
  } catch (error) {
    console.log("Error al extraer las rentas de un usuario");
    console.log(error);

    res.status(500).send("hubo un error al extraer las rentas de un usuario");
  }
};
exports.obtenerRentas = async (req, res) => {
  try {
    const rentas = await Renta.find();
    res.json({ rentas });
  } catch (error) {
    console.log(error);

    res.status(500).send("hubo un error al extraer las rentas");
  }
};

exports.eliminarRenta = async (req, res) => {
  //Revisar el id para saber si la renta existe o no
  try {
    let renta = await Renta.findById(req.params.id);

    if (!renta) {
      return res.status(404).json({ msg: "Renta no encontrada no encontrado" });
    }

    //Verificar el que creador del proyecto sea la persona que está autenticada
    if (renta.creador.toString() != req.usuario.id) {
      return res.status(401).json({ msg: "No autorizado" });
    }

    //Eliminar el proyecto
    await Renta.findOneAndRemove({ _id: req.params.id });
    res.json({ msg: "Renta eliminada eliminada" });
  } catch (error) {
    console.log(error);
    res.status(500).send("hubo un error al eliminar en el servidor");
  }
};

//Actualiza un proyecto

exports.actualizaRenta = async (req, res) => {
  try {
    const { creador } = req.body;
    console.log(req.body);
    let rentaExiste = await Renta.findById(req.params.id);

    if (!rentaExiste) {
      return res.status(404).json({
        msg: "No existe la renta seleccionada, revise o avise de este error.",
      });
    }
    //Verificar que el usuario sea dueño de la renta

    const existeUsuario = await Usuario.findById(creador);
    if (existeUsuario._id.toString() != req.usuario.id) {
      return res
        .status(401)
        .json({ msg: "No estás autorizado para editar rentas ajenas" });
    }

    rentaExiste = await Renta.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );

    res.json({ msg: "renta actualizada", renta: rentaExiste });
  } catch (error) {
    console.log(error);
  }
};
