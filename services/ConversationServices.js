const Conversation = require("../models/Conversation");

const createConversation = async data => {
  try {
    const isExisted = await findConversationByUsers(data.users);
    if (isExisted) return isExisted;
    const conversation = new Conversation(data);
    const rs = await Conversation.create(conversation);
    const result = await getConversationById(rs._id);
    return result;
  } catch (error) {
    throw error;
  }
};

const getConversationById = async id => {
  try {
    const result = await Conversation.findById(id).populate("users.user", {
      _id: 1,
      avatar: 1,
      appName: 1,
    });
    return result;
  } catch (error) {
    throw error;
  }
};

const getConversationsByUser = async userId => {
  try {
    const result = await Conversation.find({
      users: {
        $elemMatch: {
          user: userId,
        },
      },
    })
      .populate("users.user", { _id: 1, avatar: 1, appName: 1 })
      .sort({ _id: -1 });
    return result;
  } catch (error) {
    throw error;
  }
};

const findConversationByUsers = async users => {
  try {
    const result = await Conversation.findOne({ users: { $all: users } });
    return result;
  } catch (error) {
    throw error;
  }
};

const getMessagesInConversation = async conversationId => {
  try {
    const result = await Conversation.findById(conversationId).populate(
      "messages.sender",
      { _id: 1, appName: 1, avatar: 1 }
    );
    return result;
  } catch (error) {
    throw error;
  }
};

const addMessage = async data => {
  try {
    const result = await Conversation.findByIdAndUpdate(data.conversationId, {
      $push: {
        messages: data.message,
      },
    });
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createConversation,
  getConversationsByUser,
  findConversationByUsers,
  addMessage,
  getMessagesInConversation,
};
