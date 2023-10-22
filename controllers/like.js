const Like = require('../models/like');
const Publication = require('../models/publication');

const likePublication = async(req, res) => {
    try {
        const publicationId = req.params.publicationId;
        const studentId = req.student;
         const existingLike = await Like.findOne({ student: studentId.id, publication: publicationId});
        
         if (existingLike) {
            return res.status(400).json({ message: 'Ya has dado like a esta publicación.' });
         }
        let newLike = new Like ({
            student: studentId,
            publication: publicationId
        });
        
    
        await newLike.save();
        
        //Agregar la referencia del "like" al array de "likes" en la publicación
    
        await Publication.findByIdAndUpdate(publicationId, {$push: { likes: newLike}}).populate('student')
        return res.status(200).send({
                    status: 'success',
                    message: 'like guardado',
                    likes: newLike
        });
    } catch (error) {
        res.status(500).json({ message: 'Ha ocurrido un error al agregar el like.' });
    }
}
const unlikePublication = (req, res) => {

    const publicationId = req.params.publication;
    const studentId = req.student.id;
    
    Like.findOneAndDelete({
        student: studentId,
        publication: publicationId
    },(err, likeDeleted) => {
        if (err ||!likeDeleted) {
            return res.status(500).send({
                message: 'Error al eliminar el like'
            });
        }
        return res.status(200).send({
            status: 'success',
            message: 'like eliminado',
            student: studentId,
            publication: publicationId
        });
    });

};

const getLikesPublication = (req, res) => {
    
    const publicationId = req.params.publication;
    let page = 1;
    const itemsPerPage = 5;

    if (req.params.page) {
        page = req.params.page;
    }
    
    Like.find({publication: publicationId})
        .sort("created_at")
        .populate('student', '-__v')
        .paginate(page, itemsPerPage, (err, likes, total) =>{
            if (err || !likes) {
                return res.status(500).send('no se pudo encontrar likes');
            }
            return res.status(200).send({
                status: "success",
                message: 'likes de la publicación',
                likes,
                page,
                total,
                totalPages: Math.ceil(total / itemsPerPage)
            });
        })
};

module.exports = {
    likePublication,
    unlikePublication,
    getLikesPublication
}