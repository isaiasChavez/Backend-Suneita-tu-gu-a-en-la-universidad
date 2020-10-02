const ProductoBazar = require("../models/ProductoBazarModel");
const { validationResult } = require("express-validator");
const Usuario = require("../models/Usuario");

exports.crearProducto = (req, res) => {
  console.log(req.body);
  //Revisar si hay errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    console.log(errores.array());
    return res.status(400).json({
      msg: "Hubo un error al comprobar los datos",
      errores: errores.array(),
    });
  }

  try {
    //Crear un nuevo poyecto
    const producto = new ProductoBazar(req.body);

    //Guardar el creador via JWT, el que está autenticado

    producto.creador = req.usuario.id;

    producto.save();
    console.log("Creo que se ha guardado bien");
    res.json({ msg: "Se ha publicado con exito", producto });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).send("Hubo un error al ingresar el producto");
  }
};

//Obtiene todos los proyectos del usuario que se encuentra autenticado
exports.obtenerProductosUsuario = async (req, res) => {
  try {
    const productos = await ProductoBazar.find({
      creador: req.usuario.id,
    }).sort({
      creador: -1,
    });
    res.json({ productos });
  } catch (error) {
    console.log("Error al extraer las rentas de un usuario");
    console.log(error);

    res.status(500).send("hubo un error al extraer las rentas de un usuario");
  }
};
exports.obtenerProductos = async (req, res) => {
  try {
    const productos = await ProductoBazar.find();
    res.json({ productos });
  } catch (error) {
    console.log(error);

    res.status(500).send("hubo un error al extraer los productos");
  }
};

exports.eliminarProducto = async (req, res) => {
  //Revisar el id para saber si la renta existe o no
  try {
    let producto = await ProductoBazar.findById(req.params.id);

    if (!producto) {
      return res.status(404).json({ msg: "Producto no encontrado" });
    }

    //Verificar el que creador del proyecto sea la persona que está autenticada
    if (producto.creador.toString() != req.usuario.id) {
      return res.status(401).json({ msg: "No autorizado" });
    }

    //Eliminar el proyecto
    await ProductoBazar.findOneAndRemove({ _id: req.params.id });
    res.json({ msg: "Producto eliminado" });
  } catch (error) {
    console.log(error);
    res.status(500).send("hubo un error al eliminar en el servidor");
  }
};

//Actualiza un proyecto

exports.actualizaProducto = async (req, res) => {
  try {
    const { creador } = req.body;
    console.log(req.body);
    let productoExiste = await ProductoBazar.findById(req.params.id);

    if (!productoExiste) {
      return res.status(404).json({
        msg:
          "No existe el producto seleccionado, revise o avise de este error.",
      });
    }
    //Verificar que el usuario sea dueño del producto

    const existeUsuario = await Usuario.findById(creador);
    if (existeUsuario._id.toString() != req.usuario.id) {
      return res
        .status(401)
        .json({ msg: "No estás autorizado para editar rentas ajenas" });
    }

    productoExiste = await ProductoBazar.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );

    res.json({ msg: "Producto actualizado", producto: productoExiste });
  } catch (error) {
    console.log(error);
  }
};
