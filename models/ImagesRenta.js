const { Schema, model } = require("mongoose");

const ImagesRenta = new Schema({
  renta_id: String,
  creador_id: String,
  titulo: String,
  images: Array,
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("ImagesRenta", ImagesRenta);
