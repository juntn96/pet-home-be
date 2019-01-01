import React, { Component } from "react";
import { connect } from "react-redux";
import { initSocket } from "../../store/actions/socketActions";

class SocketHandle extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { socket } = this.props.socketState;
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
