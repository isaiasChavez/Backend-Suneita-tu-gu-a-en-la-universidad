const Renta = require("../models/Rentas");
const { validationResult } = require("express-validator");

exports.crearRenta = (req, res) => {
  //Revisar si hay errores
  const errores = validationResult(req);

  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  try {
    //Crear un nuevo poyecto
    const renta = new Renta(req.body);

    //Guardar el creador via JWT, el que está autenticado

    renta.creador = req.usuario.id;

    renta.save();
    res.json(renta);
  } catch (error) {
    console.log("Error:", error);
    res.status(500).send("Hubo un error");
  }
};

//Obtiene todos los proyectos del usuario que se encuentra autenticado

exports.obtenerRentas = async (req, res) => {
  try {
    const rentas = await Renta.find({ creador: req.usuario.id }).sort({
      creador: -1,
    });
    res.json({ rentas });
  } catch (error) {
    console.log(error);

    res.status(500).send("hubo un error al extraer las rentas");
  }
};

exports.eliminarProyecto = async (req, res) => {
  //Revisar el id para saber si la renta existe o no
  try {
    let proyecto = await Proyecto.findById(req.params.id);

    if (!proyecto) {
      return res.status(404).json({ msg: "Proyecto no encontrado" });
    }

    //Verificar el que creador del proyecto sea la persona que está autenticada
    if (renta.creador.toString() != req.usuario.id) {
      return res.status(401).json({ msg: "No autorizado" });
    }

    //Eliminar el proyecto
    await Renta.findOneAndRemove({ _id: req.params.id });
    res.json({ msg: "Proyecto eliminado" });
  } catch (error) {
    console.log(error);
    res.status(500).send("hubo un error al eliminar en el servidor");
  }
};

//Actualiza un proyecto
