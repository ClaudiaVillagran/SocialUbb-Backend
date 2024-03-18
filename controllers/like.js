const Like = require("../models/like");
const Publication = require("../models/publication");

const likePublication = async (req, res) => {
  try {
    console.log("object");
    const publicationId = req.params.publicationId;
    const studentId = req.user.studentId;
    console.log(publicationId, studentId);
    const existingLike = await Like.findOne({
      student: studentId,
      publication: publicationId,
    });
    console.log(existingLike);
    if (existingLike) {
      console.log("existing");
      return res
        .status(400)
        .json({ message: "Ya has dado like a esta publicación." });
    }
    let newLike = new Like({
      student: studentId,
      publication: publicationId,
    });

    await newLike.save();
    //Agregar la referencia del "like" al array de "likes" en la publicación

    await Publication.findByIdAndUpdate(publicationId, {
      $push: { likes: studentId },
    }).populate("student");
    return res.status(200).send({
      status: "success",
      message: "like guardado",
      likes: newLike,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Ha ocurrido un error al agregar el like." });
  }
};
const unlikePublication = async (req, res) => {
  const publicationId = req.params.publication;

  const studentId = req.user.studentId;
  console.log(publicationId, studentId);
  Like.findOneAndDelete(
    {
      student: studentId,
      publication: publicationId,
    },
    async (err, likeDeleted) => {
      if (err || !likeDeleted) {
        return res.status(500).send({
          message: "Error al eliminar el like",
        });
      }
      await Publication.findByIdAndUpdate(publicationId, { $pull: { likes: studentId } });
      return res.status(200).send({
        status: "success",
        message: "like eliminado",
        likeDeleted,
        student: studentId,
        publication: publicationId,
      });
    }
  );
};

const getLikesPublication = (req, res) => {
  const publicationId = req.params.publication;
  let page = 1;
  const itemsPerPage = 5;

  if (req.params.page) {
    page = req.params.page;
  }

  Like.find({ publication: publicationId })
    .sort("created_at")
    .populate("student", "-__v")
    .paginate(page, itemsPerPage, (err, likes, total) => {
      if (err || !likes) {
        return res.status(500).send("no se pudo encontrar likes");
      }
      return res.status(200).send({
        status: "success",
        message: "likes de la publicación",
        likes,
        page,
        total,
        totalPages: Math.ceil(total / itemsPerPage),
      });
    });
};

module.exports = {
  likePublication,
  unlikePublication,
  getLikesPublication,
};
