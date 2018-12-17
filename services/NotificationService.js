const Notification = require("../models/Notification");
const ExpoService = require("./ExpoService");

const addNotification = async notification => {
  try {
    ExpoService.sendNotifications(notification);
    const result = await Notification.create(notification.data);
    return result;
  } catch (error) {
    throw error;
  }
};

const getNotifications = async userId => {
  try {
    const result = await Notification.aggregate([
      { $match: { receiver: userId } },
      { $addFields: { sender: { $toObjectId: "$sender" } } },
      {
        $lookup: {
          from: "users",
          localField: "sender",
          foreignField: "_id",
          as: "sender",
        },
      },
      {
        $unwind: "$sender",
      },
    ]);
    return result;
  } catch (error) {
    throw error;
  }
};

const getNotificationsByType = async (userId, type) => {
  try {
    const result = await Notification.aggregate([
      { $match: { $or: [{ sender: userId }, { receiver: userId }], type } },
      {
        $addFields: {
          sender: { $toObjectId: "$sender" },
          receiver: { $toObjectId: "$receiver" },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "sender",
          foreignField: "_id",
          as: "sender",
        },
      },
      {
        $unwind: "$sender",
      },
      {
        $lookup: {
          from: "users",
          localField: "receiver",
          foreignField: "_id",
          as: "receiver",
        },
      },
      {
        $unwind: "$receiver",
      },
    ]);
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  addNotification,
  getNotifications,
  getNotificationsByType,
};
