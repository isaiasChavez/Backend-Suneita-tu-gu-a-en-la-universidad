const { Mongoose } = require("mongoose");

const mongoose = require("mongoose");
require("dotenv").config({ path: "variables.env" });

const URI =
  "mongodb+srv://norela:d3sc4rt3s@cluster0.2zhyg.mongodb.net/suneitaapp?retryWrites=true&w=majority";

const conectarDB = async () => {
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
    });
  } catch (error) {
    console.log("Errorrrr:", error);
    process.exit(1); //En caso de error se detiene la app
  }
};

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("Data base is connected");
});

module.exports = conectarDB;
