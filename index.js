//importar dependencias
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoSanitize = require("express-mongo-sanitize");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const { createServer } = require("http");
const { Server } = require("socket.io");
const SocketServer = require('./SocketServer')
const app = express();
// const httpServer = createServer(app);

dotenv.config();
//conexion a bbdd

//connection();
console.log("API exitosa");


//const connection = require("./database/connection")

//crear servidor node
// const app = express();
// const server = createServer(app);
// const io = new Server(server);


//const puerto = 3000;
//configurar cors
app.use(cors());

//convertir datos del body a js
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//sanitize request data
app.use(mongoSanitize());

//enable cookie parser
app.use(cookieParser());

//file upload
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

//cargar conf las rutas
const studentRoutes = require("./routes/student");
const followRoutes = require("./routes/follow");
const publicationRoutes = require("./routes/publication");
const commentRoutes = require("./routes/comment");
const likeRoutes = require("./routes/like");
const messageRoutes = require("./routes/message");
const conversationRoutes = require("./routes/conversation");

app.use("/api/student", studentRoutes);
app.use("/api/follow", followRoutes);
app.use("/api/publication", publicationRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/like", likeRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/conversation", conversationRoutes);



mongoose
  .connect(process.env.DB)
  .then(() => {
    console.log("conexion exitosa");
  })
  .catch((error) => {
    console.log(error);
  });

//poner servidor a escuchar peticiones
let server = app.listen(process.env.PORT, () => {
  console.log("Servidor de node corriendo en el puerto:", process.env.PORT);
});

const io = new Server(server, {
  connectionStateRecovery: {},
  pingTimeout: 60000,
  cors: {
    origin: "*",
  },
});



io.on("connection", (socket) => {
  console.log("socketId", socket.id);
  SocketServer(socket, io)
  // socket.on('sendMessage', (msg)=>{
  //   io.emit('recievedMessage',msg)
  // })


  // Obtén la lista de todos los conjuntos de sockets
  // const allRooms = io.sockets.adapter.rooms;

  // Imprime la lista de conjuntos de sockets en la consola del servidor
  // console.log(allRooms);

  // socket.on("disconnect", () => {
  //   console.log("user disconnected");
  // });
});

