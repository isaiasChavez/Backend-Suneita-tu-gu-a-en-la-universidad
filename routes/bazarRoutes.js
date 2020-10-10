const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const path = require("path");
const BazarController = require("../controllers/bazarController");
const auth = require("../middleware/auth");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: path.join(__dirname, "../public/uploads/"),
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + path.extname(file.originalname));
  },
  fileSize: 1000000, // 1MB
  fileFilter(req, file, next) {
    const isPhoto = file.mimetype.startsWith("image/");
    if (isPhoto) {
      next(null, true);
    } else {
      next({ message: "El tipo de archivo no es válido" }, false);
    }
  },
});

const upload = multer({ storage });

router.post(
  "/",
  auth,
  upload.array("imagenes", 3),

  check("titulo", "Falta el campo tipo cuarto").not().isEmpty().isString(),
  check("username", "Falta el campo username").not().isEmpty().isString(),
  check("creador", "Falta el campo creador").not().isEmpty(),

  check("descripcion", "Falta el campo tipo cuarto").not().isEmpty().isString(),
  check("precio", "Falta el precio").isNumeric().not().isEmpty(),
  check("estado", "Falta el estado").isString().not().isEmpty(),
  check("categoria", "Falta la categoria").isString().not().isEmpty(),
  check("activa", "Falta el activa").isBoolean().not().isEmpty(),
  // check("ubicacion", "Falta la direccion").isString().not().isEmpty(),

  BazarController.crearProducto
);

router.get("/", BazarController.obtenerProductos);
router.get("/user", auth, BazarController.obtenerProductosUsuario);

router.delete("/:id", auth, BazarController.eliminarProducto);
router.put("/:id", auth, BazarController.actualizaProducto);

module.exports = router;
