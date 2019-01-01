import SocketClient from "socket.io-client";

const initState = {
  socket: null,
};

const socketReducer = (state, { type, payload }) => {
  switch (type) {
    case "INIT": {
      const socket = SocketClient(`http://139.162.77.151:5000`);
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