//importar dependencias
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
//const connection = require("./database/connection")

dotenv.config();
//conexion a bbdd
mongoose
   .connect(process.env.DB)
   .then(() => {
    console.log("conexion exitosa");
 })
  .catch((error) => {
    console.log(error);
  });
//connection();
console.log("API exitosa");
//crear servidor node
const app = express();
//const puerto = 3000;
//configurar cors
app.use(cors())

//convertir datos del body a js
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//cargar conf las rutas
const studentRoutes = require('./routes/student');
const followRoutes = require('./routes/follow');
const publicationRoutes = require('./routes/publication');
const commentRoutes = require('./routes/comment');
const likeRoutes = require('./routes/like');

app.use("/api/student", studentRoutes);
app.use("/api/follow", followRoutes);
app.use('/api/publication', publicationRoutes);
app.use('/api/comment', commentRoutes);
app.use('/api/like', likeRoutes);

//poner servidor a escuchar peticiones
app.listen(process.env.PORT, ()=>{
  console.log("Servidor de node corriendo en el puerto:",process.env.PORT);
})
