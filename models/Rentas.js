const mongoose = require("mongoose");

const RentaSchema = mongoose.Schema({
  tipoCuarto: { type: String, required: true, trim: true },
  servicios: {
    aguaCRef: { type: Boolean, trim: true },
    wfRef: { type: Boolean, trim: true },
    pilCRef: { type: Boolean, trim: true },
    ganCRef: { type: Boolean, trim: true },
    escCRef: { type: Boolean, trim: true },
    colCRef: { type: Boolean, trim: true },
  },
  zonasDelCuarto: {
    zlrRef: { type: Boolean },
    zltRef: { type: Boolean },
    zcRef: { type: Boolean },
    ztRef: { type: Boolean },
    cochRef: { type: Boolean },
  },
  tipobano: { type: String, required: true },
  precio: { type: Number, required: true },
  tipocontrato: { type: String, required: true },
  direccion: { type: String, required: true },
  ciudad: { type: String, required: true },
  estado: { type: String, required: true },
  codigopostal: { type: String, required: true },
  creador: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
  },
});

module.exports = mongoose.model("Renta", RentaSchema);
