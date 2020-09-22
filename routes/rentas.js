const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const RentasController = require("../controllers/rentasController");
const auth = require("../middleware/auth");
const { route } = require("./usuarios");

router.post(
  "/",
  auth,
  [
    check("tipoCuarto", "Falta el campo tipo cuarto")
      .not()
      .isEmpty()
      .isString(),
    check("servicios", "Falta los servicios o vienen vacios").not().isEmpty(),
    check("zonasDelCuarto", "Falta las zonas del cuarto o vienen vacios")
      .not()
      .isEmpty(),
    check("tipobano", "Falta el tipo de baño").isString().not().isEmpty(),
    check("precio", "Falta el precio").isNumeric().not().isEmpty(),
    check("tipocontrato", "Falta el tipo de contrato")
      .isString()
      .not()
      .isEmpty(),
    check("estado", "Falta el estado").isString().not().isEmpty(),
    check("direccion", "Falta la direccion").isString().not().isEmpty(),
    check("ciudad", "Falta la ciudad").isString().not().isEmpty(),
    check("codigopostal", "Falta el codigo postal").isString().not().isEmpty(),
  ],
  RentasController.crearRenta
);
router.get("/", auth, RentasController.obtenerRentas);

router.delete("/:id", auth, RentasController.obtenerRentas);

module.exports = router;
