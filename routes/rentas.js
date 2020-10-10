const express = require("express");
const multer = require("multer");
const router = express.Router();
const { check } = require("express-validator");
const RentasController = require("../controllers/rentasController");
const auth = require("../middleware/auth");
const path = require("path");
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

  [
    check("titulo", "Falta el campo tipo cuarto").not().isEmpty().isString(),
    check("username", "Falta el campo username").not().isEmpty().isString(),
    check("creador", "Falta el campo creador").not().isEmpty(),
    check("tipoCuarto", "Falta el campo tipo cuarto")
      .not()
      .isEmpty()
      .isString(),

    check("descripcion", "Falta el campo tipo cuarto")
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

    check("mascotas", "Falta las mascotas").isBoolean().not().isEmpty(),

    check("soloestudiantes", "Falta soloestudiantes")
      .isBoolean()
      .not()
      .isEmpty(),

    check("mascotas", "Falta las mascotas").isBoolean().not().isEmpty(),

    check("medidascuarto", "Falta las medidascuarto").not().isEmpty(),

    check("luzincluida", "Falta la luzincluida").isBoolean().not().isEmpty(),

    check("deposito", "Falta el deposito").isString().not().isEmpty(),

    check("asentamiento", "Falta el asentamiento").isString().not().isEmpty(),
    check("numeroexterior", "Falta el numero exterior")
      .isNumeric()
      .not()
      .isEmpty(),

    check("estado", "Falta el estado").isString().not().isEmpty(),
    check("direccion", "Falta la direccion").isString().not().isEmpty(),
    check("ciudad", "Falta la ciudad").isString().not().isEmpty(),
    check("codigopostal", "Falta el codigo postal").isString().not().isEmpty(),
    check("contacto", "Falta el contacto").isNumeric().not().isEmpty(),
  ],
  RentasController.crearRenta
);
router.post(
  "/uploadimages",
  auth,
  upload.array("imagenesrentas", 4),
  RentasController.subirImagenes
);
router.get("/getimages/:id", RentasController.obtenerImagenes);

router.get("/", RentasController.obtenerRentas);
router.get("/user", auth, RentasController.obtenerRentasUsuario);

router.delete("/:id", auth, RentasController.eliminarRenta);
router.put("/:id", auth, RentasController.actualizaRenta);

module.exports = router;
