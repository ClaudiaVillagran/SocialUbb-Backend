const Student = require("../models/student");
const validator = require("validator");
const bcrypt = require("bcrypt");
const { DEFAULT_IMAGE, DEFAULT_BIO } = process.env;

 const createUser = async (userData) => {
  const {name, email, image, bio, password ,myHashtags} = userData;

  //check if fields are empty
  if (!name || !email || !password) {
    return res.status(404).send({message:"Por favor llena todos los campos"})
  }
  //check name length
  if (
    !validator.isLength(name, {
      min: 2,
      max: 35,
    })
  ) {
    return res.status(404).send({message:"Asegurate que tu nombre este entre 2 y 16 caracteres"})
  }

  //Check status length
  if (bio && bio.length > 64) {
    return res.status(404).send({message:"Asegurate que tu estado sea menor a 64 caracteres"})
  }

  //check if email address is valid
  if (!validator.isEmail(email)) {
    return res.status(404).send({message:"Por favor ingresa un email valido"})
  }

  //check if user already exist
  const checkDb = await Student.findOne({ email });
  if (checkDb) {
    return res.status(404).send({message:"Por favor intenta con un email distinto, este ya existe"})
  }

  //check password length
  if (
    !validator.isLength(password, {
      min: 6,
      max: 128,
    })
  ) {
    return res.status(404).send({message:"Asegurate que tu contraseña este entre 6 y 128 caracteres"})
  }

 //hash password--->to be done in the user model

  //adding user to databse
  const student = await new Student({
    name,
    email,
    myHashtags,
    image: image || DEFAULT_IMAGE,
    bio: bio || DEFAULT_BIO,
    password,
  }).save();
  return student;
};

 const signUser = async (email, password) => {
  const student = await Student.findOne({ email: email.toLowerCase() }).lean();

  //check if user exist
  if (!student) return res.status(404).send({message:"Credenciales invalidas"})

  //compare passwords
  let passwordMatches = await bcrypt.compare(password, student.password);

  if (!passwordMatches) throw res.status(404).send({message:"Credenciales invalidas"})

  return student;
};

const findUser = async (userId) => {
  const user = await Student.findById(userId);
  if (!user) res.status(500).json({ message: "Ha ocurrido un error" });
  return user;
};

// { name: { $regex: keyword, $options: "i" } }
// Busca estudiantes cuyos nombres coincidan con el patrón de búsqueda
// ($regex) de manera insensible a mayúsculas y minúsculas ($options: "i").

const searchUsersKey = async (keyword, userId) => {
  const users = await Student.find({
    $or: [
      { name: { $regex: keyword, $options: "i" } },
      { email: { $regex: keyword, $options: "i" } },
    ],
  }).find({
    _id: { $ne: userId },
  });
  return users;
};

module.exports = {
  createUser,
  findUser,
  signUser,
  searchUsersKey,
};
