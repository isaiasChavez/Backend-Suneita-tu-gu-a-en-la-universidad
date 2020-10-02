const express = require("express");
const conectarDB = require("./config/database");
const cors = require("cors");

//Configuración
const app = express();
const PORT = process.env.PORT || 4000;

//Conexión a la base de datos
conectarDB();

//MIDDLEWARES
app.use(cors());
app.use(express.json({ extended: true }));

//RUTAS
app.use("/api/users", require("./routes/usuarios"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/rentas", require("./routes/rentas"));
app.use("/api/bazar", require("./routes/bazarRoutes"));

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
