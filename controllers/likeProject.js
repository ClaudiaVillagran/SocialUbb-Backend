const Like = require("../models/likeProject");
const Project = require("../models/project");

const likeProject = async (req, res) => {
  try {
    // console.log("object");
    const projectId = req.params.projectId;
    const studentId = req.user.studentId;
    // console.log(projectId, studentId);
    const existingLike = await Like.findOne({
      student: studentId,
      project: projectId,
    });
    // console.log(existingLike);
    if (existingLike) {
      // console.log("existing");
      return res
        .status(400)
        .json({ message: "Ya has dado like a esta publicación." });
    }
    let newLike = new Like({
      student: studentId,
      project: projectId,
    });

    await newLike.save();
    //Agregar la referencia del "like" al array de "likes" en la publicación

    await Project.findByIdAndUpdate(projectId, {
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
const unlikeProject = async (req, res) => {
  const projectId = req.params.project;

  const studentId = req.user.studentId;
  // console.log(projectId, studentId);
  Like.findOneAndDelete(
    {
      student: studentId,
      project: projectId,
    },
    async (err, likeDeleted) => {
      if (err || !likeDeleted) {
        return res.status(500).send({
          message: "Error al eliminar el like",
        });
      }
      await Project.findByIdAndUpdate(projectId, { $pull: { likes: studentId } });
      return res.status(200).send({
        status: "success",
        message: "like eliminado",
        likeDeleted,
        student: studentId,
        project: projectId,
      });
    }
  );
};

const getLikesProject = (req, res) => {
  const projectId = req.params.project;
  let page = 1;
  const itemsPerPage = 5;

  if (req.params.page) {
    page = req.params.page;
  }

  Like.find({ project: projectId })
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
  likeProject,
  unlikeProject,
  getLikesProject,
};
