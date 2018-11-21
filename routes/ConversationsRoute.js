const express = require("express");
const router = express.Router();

const ConversationController = require("../controllers/ConversationController");

const routerIO = io => {
  router.get("/:userId", ConversationController.getConversationsByUser);
  router.get("/message/:conversationId", ConversationController.getMessagesInConversation);
  router.post("/add", ConversationController.createConversation);
  router.post("/match", ConversationController.findConversationByUsers);
  router.post("/message/add", (req, res) => {
    ConversationController.addMessage(req, res, io);
  });
  return router;
};

module.exports = routerIO;
