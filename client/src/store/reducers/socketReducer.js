import SocketClient from "socket.io-client";

const initState = {
  socket: null,
};

const socketReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case "INIT": {
      console.log("initial socket");
      const socket = SocketClient(`http://139.162.77.151:5000`);
      // const socket = SocketClient(`http://localhost:3000`);
      return {
        ...state,
        socket,
      };
    }
    default: {
      return state;
    }
  }
};

export default socketReducer;
