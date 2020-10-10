const mongoose = require("mongoose");

const RentaSchema = mongoose.Schema({
  titulo: { type: String, required: true, trim: true },
  descripcion: { type: String, required: true, trim: true },
  activa: { type: Boolean },
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
    cocinaRef: { type: Boolean },
    balconRef: { type: Boolean },
  },

  soloestudiantes: { type: Boolean, required: true },
  mascotas: { type: Boolean, required: true },
  medidascuarto: {
    largo: { type: Number },
    ancho: { type: Number },
  },

  tipobano: { type: String, required: true },
  luzincluida: { type: Boolean, required: true },
  precio: { type: Number, required: true },
  deposito: { type: String, required: true },

  tipocontrato: { type: String, required: true },
  direccion: { type: String, required: true },
  asentamiento: { type: String, required: true },

  numerointerior: { type: Number },
  numeroexterior: { type: Number, required: true },

  ciudad: { type: String, required: true },
  estado: { type: String, required: true },
  codigopostal: { type: String, required: true },
  contacto: { type: Number, required: true },
  creador: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  username: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Renta", RentaSchema);
