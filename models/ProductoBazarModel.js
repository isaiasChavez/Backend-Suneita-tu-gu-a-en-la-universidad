const mongoose = require("mongoose");

const ProductoBazarSchema = mongoose.Schema({
  titulo: { type: String, required: true, trim: true },
  precio: { type: Number, required: true },
  descripcion: { type: String, required: true, trim: true },
  estado: { type: String, required: true, trim: true },
  categoria: { type: String, required: true, trim: true },
  activa: { type: Boolean },
  //   ubicacion: { type: String, required: false }, //Por ahora
  creador: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
  },
  username: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("ProductoBazar", ProductoBazarSchema);
