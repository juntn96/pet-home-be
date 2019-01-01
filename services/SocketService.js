const socket = require("socket.io");
const ConversationService = require("./ConversationServices");
const NotificationService = require("./NotificationService");
const AppUserService = require("./AppUserService");
const ExpoService = require("./ExpoService");

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
  socket.on("hidePost", post => {
    console.log("hidden post", post);
    hidePost(post);
  });
  socket.on("commentPost", post => {
    console.log("comment post", post);
    onCommentPost(post);
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
    messageNotification(mes.notification.receiver, mes);
    io.in(mes.conversationId).emit("sendMessage", mes);
  } catch (error) {
    throw error;
  }
};

const messageNotification = async (toId, mes) => {
  const receiver = await AppUserService.findUser(toId);
  ExpoService.sendNotifications({
    tokens: [receiver.expoToken],
    data: {
      message: `Bạn có tin nhắn mới từ:\n ${mes.user.name}: ${mes.message.text}`,
      type: "message",
      sender: mes.user._id,
    },
  });
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

const hidePost = async post => {
  try {
    const io = socketService.io;
    io.emit("hidePost", post);
  } catch (error) {
    throw error;
  }
};

const onCommentPost = async post => {
  try {
    const io = socketService.io;
    io.emit("commentPost", post);
  } catch (error) {
    throw error;
  }
};

const socketService = new SocketService();

module.exports = socketService;
