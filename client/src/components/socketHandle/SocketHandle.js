import React from "react";
import { connect } from "react-redux";
import { initSocket } from "../../store/actions/socketActions";

class SocketHandle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.initSocket();
  }

  componentWillUnmount() {
    const { socket } = this.props.socketState;
    if (socket) {
      socket.disconnect();
    }
  }

  render() {
    console.log(this.props.socketState.socket);
    return null;
  }
}

const mapStateToProps = state => {
  return {
    socketState: state.socketState,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initSocket: () => {
      dispatch(initSocket());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SocketHandle);
