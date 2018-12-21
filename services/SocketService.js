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
  socket.on("sendMessage", data => {
    sendMessage(socket, data);
  });
  socket.on("disconnect", reason => {
    socket.leaveAll();
  });
};

const joinConversation = (socket, conversation) => {
  console.log("socket joined: ", conversation._id);
  socket.join(conversation._id);
};

const sendMessage = async data => {
  try {
    const io = socketService.io;
    console.log(data)
    const messageData = {
      conversationId: data.conversationId,
      message: {
        sender: data.user._id,
        content: data.message.text,
      },
    };
    await ConversationService.addMessage(messageData);
    io.in(data.conversationId).emit("sendMessage", data);
  } catch (error) {
    throw error;
  }
};

const socketService = new SocketService();

module.exports = socketService;
