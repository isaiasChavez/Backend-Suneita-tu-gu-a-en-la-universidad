const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const usuarioController = require("../controllers/usuarioController");

router.post(
  "/",
  [
    check("name", "el nombre es obligatorio").not().isEmpty(),
    check("email", "Agrega un email válido").isEmail(),
    check("password", "El password debe ser de mínimo 6 caracteres").isLength({
      min: 6,
    }),
    check("username", "el nombre es obligatorio").not().isEmpty(),
  ],
  usuarioController.crearUsuario
);

module.exports = router;
