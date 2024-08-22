const Project = require('../models/project');
const fs = require('fs');
const path = require('path');
const followService = require('../services/followStudentIds');
const likeService = require('../services/likeProjectId');
//guardar publicaciones
const save = (req, res) => {
    //recorger datos del body
    const params = req.body;
    // console.log(params)
    //si no me llegan respuesta negativa
    if (!params.description || !params.title) {
        return res.status(400).send("Debe ingresar un texto o un título");
    }
    
    let newProject = new Project(params);
    // console.log(newProject)
    // console.log(newPublication)
    newProject.student = req.user.studentId;
    //guardar publicacion en la base de datos
    newProject.save((err, projectStored) => {
        if (err || !projectStored) {
            return res.status(500).send('No se pudo guardar la publicación');
        }

        // Realizar el populate del campo student
        Project.findById(projectStored._id).populate('student').exec((err, populatedProject) => {
            if (err || !populatedProject) {
                return res.status(500).send('Error al obtener la información completa del proyecto');
            }

            return res.status(200).send({
                status: "success",
                message: 'Publicación guardada',
                project: populatedProject
            });
        });
    });
};
//sacar una publicacion
const detailProject = (req, res) => {
    //sacar id de la url
    const projectId = req.params.projectId;

    //find con la condicion id
    Project.findById(projectId, async (err, projectFound) => {
            if (err || !projectFound) {
                return res.status(500).send('no se pudo encontrar la publicacion');
            }
            let likeProject = await likeService.likeProject(projectId)
            return res.status(200).send({
                status: "success",
                message: 'Detalle de la publicacion solicitada',
                projectFound,
                likes: likeProject.likes
            });
        });
};
const projectWithLike = async (req, res) => {
    try {
        const projectId = req.params.projectId;
        
        const project = await Project.findById(projectId).populate('likes');
        // console.log(project)
        return res.status(200).send({
            status: "success",
            message: 'Detalle de la publicacion solicitada',
            project
        });
    } catch (error) {
        res.status(500).json({ message: 'Ha ocurrido un error al obtener la publicación con likes.' });
    }
};
//eliminar publicacion
const deleteProject = (req, res) => {
    //sacar id de la url
    const projectId = req.params.projectId;
    // console.log(projectId);
    //find con la condicion id
    Project.find({"student": req.user.studentId, "_id": projectId}).remove((err, projectRemoved) => {
        if (err ||!projectRemoved) {
            return res.status(500).send('no se pudo encontrar la publicacion');
        }
        return res.status(200).send({
            status: "success",
            message: 'Publicacion eliminada',
            projectRemoved,
            deletedProjectId: projectId
        });
    });
};

//listar publicaciones de un usuario especifico

const projectStudent = (req, res) => {
    //sacar id del usuario 
    const studentId = req.params.id;
    //controlar las paginas
    let page = 1;
    const itemsPerPage = 5;

    if (req.params.page) {
        page = req.params.page;
    }

    //find, pupulate y paginacion
    Project.find({"student": studentId})
        .sort("-created_at")
        .populate('student', '-password -__v -email')
        .paginate(page, itemsPerPage, (err, projects, total) => {
            if (err ||!projects) {
                return res.status(500).send('no se pudo encontrar publicaciones');
            }
            return res.status(200).send({
                status: "success",
                message: 'Proyectos del estudiante',
                projects,
                page,
                total,
                totalPages: Math.ceil(total / itemsPerPage)
            });
        })
};
//subir ficheros
const upload = (req, res) => {
    // Sacar publication id
    const projectId = req.params.id;

    // Recoger el fichero de imagen y comprobar que existe
    if (!req.file) {
        return res.status(404).send({
            status: "error",
            message: "Petición no incluye la imagen"
        });
    }

    // Conseguir el nombre del archivo
    let image = req.file.originalname;

    // Sacar la extension del archivo
    const imageSplit = image.split("\.");
    const extension = imageSplit[1];
   
    // Comprobar extension
    if (extension != "png" && extension != "jpg" && extension != "jpeg" && extension != "gif" && extension != "PNG" && extension != "JPG" && extension != "JPGE" && extension != "GIF") {
        // console.log(extension)
        // Borrar archivo subido
        const filePath = req.file.path;
        const fileDeleted = fs.unlinkSync(filePath);

        // Devolver respuesta negativa
        return res.status(400).send({
            status: "error",
            message: "Extensión del fichero invalida"
        });
    }

    // Si si es corconsole.log(image)recta, guardar imagen en bbdd
    Project.findOneAndUpdate({ student: req.student.id, "_id": projectId }, { file: req.file.filename }, { new: true }, (error, projectUpdated) => {
        if (error || !projectUpdated) {
            return res.status(500).send({
                status: "error",
                message: "Error en la subida del archivo"
            })
        }

        // Devolver respuesta
        return res.status(200).send({
            status: "success",
            project: projectUpdated,
            file: req.file,
            image
        });
    });

}
//devolver archivos multimedia
const media = (req, res) => {

    //sacar el parametro de la url
    const file = req.params.file;

    //mostrar el path de la imagen
    const filePath = "./uploads/publications/" + file;
    //comprobar si existe la imagen
    fs.stat(filePath, (error, exists) => {
        if (error || !exists) {
            return res.status(404).send( "no existe la imagen")
        }
        //devolver la imagen
        return res.sendFile(path.resolve(filePath));

    });
};
//listar publicaciones
const feed = async (req, res) => {
    //sacar la pagina actual
    
    let page = 1;
    if (req.params.page) {
        page = req.params.page;
    }
    //elementos por pagina
    let itemsPerPage = 5;
    //sacar un array de id, elementos que estan dentro de la coleccion follow, como usuario identificado
    try {
        const myFollows = await followService.followStudentIds(req.user.studentId);
        // const publications = await Publication.find({student: myFollows.following}).populate('student').sort('-created_at')
        const allPublications =  Project.find()
                                                    .populate('student', '-password -__v -email')
                                                    .sort('-created_at')
                                                    .paginate(page, itemsPerPage,async (err, projects, total) => {

                                                            if (err ||!projects) {
                                                                return res.status(500).send('no se pudo encontrar publicaciones');
                                                            }
                                                            
                                                            return res.status(200).send({
                                                                status: "success",
                                                                message: 'feed',
                                                                following: myFollows.following,
                                                                projects,
                                                                page,
                                                                total,
                                                                totalPages: Math.ceil(total / itemsPerPage)
                                                            });
                                                    });
    } catch (error) {
        return res.status(500).send(error);
    }

    //find a publicaciones in, ordenar, popular y paginar

};


module.exports = {
    save,
    detailProject,
    projectWithLike,
    deleteProject,
    projectStudent,
    upload,
    media,
    feed
};
