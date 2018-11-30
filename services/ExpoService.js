const { Expo } = require("expo-server-sdk");
let expo = new Expo();
const sendNotifications = (data, tokens) => {
  const messages = tokens.map(token => {
    return {
      to: token,
      sound: "default",
      body: "testing",
      data: {
        message: "Hello"
      },
    };
  });
  return Promise.all(
    expo
      .chunkPushNotifications(messages)
      .map(expo.sendPushNotificationsAsync, expo)
  );
};

module.exports = {
  sendNotifications,
};
