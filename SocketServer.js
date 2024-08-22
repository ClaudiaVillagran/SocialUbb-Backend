let onlineStudents = [];
// Change the export name to SocketServer
const SocketServer = function (socket, io) {
  socket.on("join", (student) => {
    // console.log(' joined', student);
    socket.join(student._id);

    //add joined user to online users
    if (!onlineStudents.some((s) => s.studentId === student._id)) {
      onlineStudents.push({ studentId: student._id, socketId: socket.id });
      // console.log(onlineStudents)
    }
    //send online users to frontend
    io.emit("get-online-students", onlineStudents);
  });

  //socket disconnect
  socket.on("disconnect", () => {
    onlineStudents = onlineStudents.filter(
      (student) => student.socketId !== socket.id
    );
    io.emit("get-online-students", onlineStudents);
  });

  socket.on("join conversation", (conversation) => {
    // console.log('convo', conversation);
    socket.join(conversation);
  });

  socket.on("sendMessage", (message) => {
    // console.log('message.conversation', message);
    let conversation = message.conversation;
    // console.log('conversation', conversation);
    if (!conversation.students) return;
    conversation.students.forEach((student) => {
      //  console.log(user._id, message.sender._id )
      if (student._id === message.sender._id) return;
      //    console.log('useraaa', student);
      socket.in(student._id).emit("messageReceived", message);
    });
  });

  //typing
  socket.on("typing", (conversation) => {
    // console.log("typing", conversation);
    socket.in(conversation).emit("typing", conversation);
  });
  socket.on("stop typing", (conversation) => {
    // console.log("stop typing", conversation);
    socket.in(conversation).emit("stop typing");
  });

  socket.on('newLike', (project, student) => {
    // console.log('projectId', projectId);
    // console.log('student', studentid);
    console.log(project.student._id)
    socket.in(project.student._id).emit('newLikeRecived', student, project);
  });
  socket.on('newComment', (project, student) => {
    // console.log('projectId', project);
    // console.log('student', student);
    socket.in(project.student._id).emit('newCommentRecived', student, project);
  })
  socket.on('newPartner', (project, student) => {
    // console.log('projectId', project);
    // console.log('student', student);
    socket.in(project.student._id).emit('newPartnerRecived', student, project);
  });
  socket.on('newFollow', (toStudent, fromStudent) => {
    // console.log('projectId', toStudent);
    // console.log('student', fromStudent);
    socket.in(fromStudent).emit('newFollowRecived', toStudent);
  });
};


// Export the function
module.exports = SocketServer;
