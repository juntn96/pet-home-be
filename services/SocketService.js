const socket = require("socket.io");
const ConversationService = require("./ConversationServices");

class SocketService {
  constructor() {
    this.io = null;
  }

  configure(server) {
    this.io = socket(server);
    this.io.on("connection", socket => {
      onConnection(socket);
    });
  }
}

const onConnection = socket => {
  socket.on("joinConversation", conversation =>
    joinConversation(socket, conversation)
  );
  socket.on("leaveConversation", conversation =>
    leaveConversation(socket, conversation)
  );
  socket.on("sendMessage", mes => {
    sendMessage(mes);
  });
  socket.on("votePost", post => {
    console.log(">> vote post: ", post);
    votePost(post);
  });
  socket.on("disconnect", reason => {
    socket.leaveAll();
  });
  socket.on("banUser", user => {
    console.log("user get banned", user);
    banUser(user);
  });
};

const joinConversation = (socket, conversation) => {
  console.log("socket joined: ", conversation._id);
  socket.join(conversation._id);
};

const leaveConversation = (socket, conversation) => {
  console.log("socket leave: ", conversation._id);
  socket.leave(conversation._id);
};

const sendMessage = async mes => {
  try {
    const io = socketService.io;
    const messageData = {
      conversationId: mes.conversationId,
      message: {
        sender: mes.user._id,
        content: mes.message.text,
      },
    };
    await ConversationService.addMessage(messageData);
    io.in(mes.conversationId).emit("sendMessage", mes);
  } catch (error) {
    throw error;
  }
};

const votePost = async post => {
  try {
    const io = socketService.io;
    io.emit("votePost", post);
  } catch (error) {
    throw error;
  }
};

const banUser = async user => {
  try {
    const io = socketService.io;
    io.emit("banUser", user);
  } catch (error) {
    throw error;
  }
};

const socketService = new SocketService();

module.exports = socketService;
