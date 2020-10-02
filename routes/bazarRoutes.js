const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const BazarController = require("../controllers/bazarController");
const auth = require("../middleware/auth");

router.post(
  "/",
  auth,
  [
    check("titulo", "Falta el campo tipo cuarto").not().isEmpty().isString(),
    check("username", "Falta el campo username").not().isEmpty().isString(),
    check("creador", "Falta el campo creador").not().isEmpty(),

    check("descripcion", "Falta el campo tipo cuarto")
      .not()
      .isEmpty()
      .isString(),
    check("precio", "Falta el precio").isNumeric().not().isEmpty(),
    check("estado", "Falta el estado").isString().not().isEmpty(),
    check("categoria", "Falta la categoria").isString().not().isEmpty(),
    check("activa", "Falta el activa").isBoolean().not().isEmpty(),
    // check("ubicacion", "Falta la direccion").isString().not().isEmpty(),
  ],
  BazarController.crearProducto
);
router.get("/", BazarController.obtenerProductos);
router.get("/user", auth, BazarController.obtenerProductosUsuario);

router.delete("/:id", auth, BazarController.eliminarProducto);
router.put("/:id", auth, BazarController.actualizaProducto);

module.exports = router;
