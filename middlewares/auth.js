//importar modulo
const jwt = require("jsonwebtoken");
const moment = require("moment");

//importar clave secreta
// const libjwt = require('../services/jwt')
// const secret = libjwt.secret

//funcion auntenticacion
exports.auth = (req, res, next) => {
  //comprobar si llega la cabecera auth
  if (!req.headers.authorization) {
    return res.status(403).send("la peticion no tiene la cabecera de auth");
  }

  //quitar comillas del token
  let token = req.headers.authorization.replace(/['"]+/g, "");
  //decodificar el token

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
    if (err) {
      return res.status(404).send("token invalido");
    }
    req.user = payload;
    next();
  });
  // //comprobar si llega la cabecera auth
  // if (!req.headers.authorization) {
  //     return res.status(403).send("la peticion no tiene la cabecera de auth")
  // }

  // //quitar comillas del token
  // let token = req.headers.authorization.replace(/['"]+/g,'');
  // //decodificar el token
  // try {
  //     let payload = jwt.decode(token, secret);

  //     //comprobar expiracion del token
  //     if (payload.exp <= moment().unix()) {
  //         return res.status(404).send("token expirado")
  //     }
  //     //agregar datos del usuario a req
  //     req.student = payload
  // } catch (error) {
  //     return res.status(404).send("token invalido")
  // }

  // //pasar a ejecucion de accion
  // next();
};
