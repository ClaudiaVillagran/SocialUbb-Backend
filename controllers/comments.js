// const Student = require('../models/student');
// const Publication = require('../models/publication');
const Comment = require('../models/comment');
const fs = require('fs');
const path = require('path');

const save = (req, res) =>{

    const params = req.body;
    console.log(params.text)

    const publicationId= req.params.publication;
    
    if (!params.text) {
        return res.status(400).send("Debe ingresar un texto");
    }

    let newComment = new Comment(params);
    newComment.student = req.student.id;
    newComment.publication=publicationId

    newComment.save((err, commentStored) =>{
        if (err || !commentStored) {
            return res.status(500).send('no se pudo guardar el comentario');
        }
        return res.status(200).send({
            status: "success",
            message: 'Comentario guardado',
            commentStored
        });

    });
}
const deleteComment = (req, res) =>{
    const commentId = req.params.id;
    const publicationId = req.params.publication;

    Comment.find({"student": req.student.id,"publication": publicationId, "_id": commentId}).remove((err, commentRemoved)=>{
        if (err || !commentRemoved) {
            return res.status(500).send('no se pudo encontrar el comentario');
        }
        return res.status(200).send({
            status: "success",
            message: 'Comentario eliminado',
            commentRemoved
        });
    });
}
const commentPublication = (req, res) =>{
    const publicationId = req.params.publication;
    // const studentId= req.params.id;

    let page = 1;
    const itemsPerPage = 3;

    if (req.params.page) {
        page = req.params.page;
    }

    Comment.find({"publication": publicationId})
        .sort("-created_at")
        .populate('publication', '-__v')
        .paginate(page, itemsPerPage, (err, comments, total) =>{
            if (err || !comments) {
                return res.status(500).send('no se pudo encontrar comentarios');
            }
            return res.status(200).send({
                status: "success",
                message: 'Comentarios de la publicación',
                comments,
                page,
                total,
                totalPages: Math.ceil(total / itemsPerPage)
            });
        });
}
const upload = (req, res) => {
    const commentId = req.params.id;

    if (!req.file) {
        return res.status(404).send({
            status: "error",
            message: "Petición no incluye la imagen"
        });
    }

    let image = req.file.originalname;

    const imageSplit = image.split(".");
    const extension = imageSplit[1];
    console.log(extension)

    if (extension != "png" && extension != "jpg" && extension != "jpeg" && extension != "gif") {

        // Borrar archivo subido
        const filePath = req.file.path;
        const fileDeleted = fs.unlinkSync(filePath);

        // Devolver respuesta negativa
        return res.status(400).send({
            status: "error",
            message: "Extensión del fichero invalida."
        });
    }
    Comment.findOneAndUpdate({student: req.student.id, _id: commentId},{image: req.file.filename}, {new:true}, (error, commentUpdated)=>{
        if (error || !commentUpdated) {
            return res.status(500).send({
                status: "error",
                message: "Error en la subida del archivo."
            });
        }
        return res.status(200).send({
            status: "success",
            comment: commentUpdated,
            file: req.file,
            image
        });
    });
}
const media = (req, res) => {
    const file = req.params.file;
    const filePath= "./uploads/comments/"+file;
    fs.stat(filePath, (error, exists)=>{
        if (error || !exists) {
            return res.status(404).send( "no existe la imagen")
        }
        //devolver la imagen
        return res.sendFile(path.resolve(filePath));
    });
};
// const feed = async (req, res) => {
//     let page = 1;
//     let itemsPerPage = 10;

//     if (req.params.page) {
//         page = req.params.page;
//     }

//     try {
//         const allComments = Comment.find()
//                                         .populate('student publication', '-__v -email -password')
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
    commentPublication,
    upload,
    media,
};