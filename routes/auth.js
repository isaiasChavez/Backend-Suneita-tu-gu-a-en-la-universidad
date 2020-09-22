//RUTAS PARA AUTENTICAR EL USUARIO
const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/authController");
const auth = require("../middleware/auth");

router.post("/", AuthController.autenticarUsuario);

router.get("/", auth, AuthController.usuarioAutenticado);

module.exports = router;
