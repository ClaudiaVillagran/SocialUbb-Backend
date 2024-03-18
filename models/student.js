const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const validator = require("validator");
const bcrypt = require ("bcrypt");

const studentSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Por favor ingresa tu nombre"],
    },
    email: {
      type: String,
      required: [true, "Por favor ingresa tu email"],
      unqiue: [true, "Este email ya esta registrado"],
      validate: [validator.isEmail, "Please provide a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Por favor ingresa tu contraseña"],
      minLength: [
        6,
        "Por favor asegurate de que tu contraseña tiene al menos 6 caracteres",
      ],
      maxLength: [
        128,
        "Por favor asegurate de que tu contraseña tiene menos de 128 caracteres",
      ],
    },
    bio: {
      type: String,
      default: "Hey there ! I am using SocialUbb",
    },
    image: {
      type: String,
      default:
        "https://res.cloudinary.com/dcke5pwh4/image/upload/v1702100359/u7ss0vutgvg19aymahoi.png",
    },
    myHashtags: [String],
    created_at: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "students",
    timestamps: true,
  }
);

studentSchema.plugin(mongoosePaginate);

studentSchema.pre("save", async function (next) {
  try {
    if (this.isNew) {
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(this.password, salt);
      this.password = hashedPassword;
    }
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = model("Student", studentSchema);
