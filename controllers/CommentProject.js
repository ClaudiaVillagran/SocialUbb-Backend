// const Student = require('../models/student');
// const Project = require('../models/Project');
const Project = require("../models/project");
const Comment = require("../models/CommentProject");

const save = async (req, res) => {
  try {
    const params = req.body;
    const projectId = req.params.projectId;
    const studentId = req.user.studentId;
    // console.log(params);

    if (!params.text) {
      return res.status(400).send("Debe ingresar un texto");
    }
    // console.log("da", params.text.replace(/\s/g, "").length);
    if (params.text.replace(/\s/g, "").length <= 0) {
      return res.status(400).send("Debe ingresar un texto");
    }

    let newComment = new Comment({
      student: studentId,
      project: projectId,
      text: params.text,
    });
    // console.log(newComment);
    await newComment.save();

    const savedComment = await Comment.findById(newComment._id).populate(
      "student"
    );

    // await Project.findByIdAndUpdate(
    //   projectId,
    //   { $push: { comments: newComment } },
    //   { new: true }
    // ).populate("student ");
    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      { $push: { comments: newComment._id } },
      { new: true }
    ).populate({ path: 'comments', populate: { path: 'student' } }).populate('student');



    
    return res.status(200).send({
      status: "success",
      message: "comentario guardado",
      comment: savedComment,
      updatedProject,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Ha ocurrido un error al agregar el comentario." });
  }
};

const deleteComment = async (req, res) => {
  try {
    const commentId = req.params.commentId;
    const projectId = req.params.projectId;

    // Elimina el comentario de la publicación
    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      { $pull: { comments: commentId } },
      { new: true }
    );

    if (!updatedProject) {
      return res.status(404).send("Publicación no encontrada");
    }

    // Elimina el comentario
    const commentRemoved = await Comment.deleteOne({ _id: commentId });

    if (!commentRemoved) {
      return res.status(404).send("Comentario no encontrado");
    }

    return res.status(200).send({
      status: "success",
      message: "Comentario eliminado",
      commentRemoved,
      student: req.user.studentId,
      commentId: commentId,
      projectId: projectId
    });
  } catch (error) {
    console.error("Error al eliminar el comentario:", error);
    return res.status(500).send("Error al eliminar el comentario");
  }
};
// const commentProject = (req, res) => {
//   const projectId = req.params.projectId;
//   // const studentId= req.params.id;

//   // let page = 1;
//   // const itemsPerPage = 2;

//   // if (req.params.page) {
//   //     page = req.params.page;
//   // }

//   Comment.find({ Project: projectId })
//     .sort("-created_at")
//     .populate("Project student", "-__v"),
//     (err, comments) => {
//       if (err || !comments) {
//         return res.status(500).send("no se pudo encontrar comentarios");
//       }
//       return res.status(200).send({
//         status: "success",
//         message: "Comentarios de la publicación",
//         comments,
//         // page,
//         // total,
//         // totalPages: Math.ceil(total / itemsPerPage)
//       });
//     };
// };
const commentProject = (req, res) => {
  const projectId = req.params.projectId;

  Comment.find({ project: projectId })
    .sort("created_at")
    .populate("project student", "-__v")
    .exec((err, comments) => {
      if (err || !comments) {
        return res.status(500).send("No se pudo encontrar comentarios");
      }
      return res.status(200).send({
        status: "success",
        message: "Comentarios de la publicación",
        comments,
      });
    });
};
const commentById = (req, res) => {
  const commentId = req.params.commentId;

  Comment.find({ _id: commentId })
    .sort("created_at")
    .populate("project student", "-__v")
    .exec((err, comment) => {
      if (err || !comment) {
        return res.status(500).send("No se pudo encontrar comentarios");
      }
      return res.status(200).send({
        status: "success",
        message: "Comentario",
        comment,
      });
    });
};

// const upload = (req, res) => {
//   const commentId = req.params.id;

//   if (!req.file) {
//     return res.status(404).send({
//       status: "error",
//       message: "Petición no incluye la imagen",
//     });
//   }

//   let image = req.file.originalname;

//   const imageSplit = image.split(".");
//   const extension = imageSplit[1];
//   console.log(extension);

//   if (
//     extension != "png" &&
//     extension != "jpg" &&
//     extension != "jpeg" &&
//     extension != "gif"
//   ) {
//     // Borrar archivo subido
//     const filePath = req.file.path;
//     const fileDeleted = fs.unlinkSync(filePath);

//     // Devolver respuesta negativa
//     return res.status(400).send({
//       status: "error",
//       message: "Extensión del fichero invalida.",
//     });
//   }
//   Comment.findOneAndUpdate(
//     { student: req.student.id, _id: commentId },
//     { image: req.file.filename },
//     { new: true },
//     (error, commentUpdated) => {
//       if (error || !commentUpdated) {
//         return res.status(500).send({
//           status: "error",
//           message: "Error en la subida del archivo.",
//         });
//       }
//       return res.status(200).send({
//         status: "success",
//         comment: commentUpdated,
//         file: req.file,
//         image,
//       });
//     }
//   );
// };
// const media = (req, res) => {
//   const file = req.params.file;
//   const filePath = "./uploads/comments/" + file;
//   fs.stat(filePath, (error, exists) => {
//     if (error || !exists) {
//       return res.status(404).send("no existe la imagen");
//     }
//     //devolver la imagen
//     return res.sendFile(path.resolve(filePath));
//   });
// };
// const feed = async (req, res) => {
//     let page = 1;
//     let itemsPerPage = 10;

//     if (req.params.page) {
//         page = req.params.page;
//     }

//     try {
//         const allComments = Comment.find()
//                                         .populate('student project', '-__v -email -password')
//                                         .sort('-created_at')
//                                         .paginate(page, itemsPerPage,(err, comments, total)=>{
//                                             if (err || !comments) {
//                                                 return res.status(500).send('no se pudo encontrar los comentarios');
//                                             }
//                                             return res.status(200).send({
//                                                 status: "success",
//                                                 message: 'feed',
//                                                 comments,
//                                                 page,
//                                                 total,
//                                                 totalPages: Math.ceil(total / itemsPerPage)
//                                             });
//                                         })
//     } catch (error) {
//         return res.status(500).send(error);
//     }
// }

module.exports = {
  save,
  deleteComment,
  commentProject,
  commentById
  // upload,
  // media,
};
