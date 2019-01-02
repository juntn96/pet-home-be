import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

class SuccessMsg extends Component {
  render () {
    return (
      <div className="alert alert-success" id="messageTrigger" style={{display:"none",color:"green",zIndex:10000,position:"fixed",opacity:0.5, border:"2px green solid",top:"14%",left:"45%"}}>
          <FontAwesomeIcon icon={faCheckCircle} size='1x' color='green' /> Xử lý thành công!
          </div>
    )
  }
}

export default SuccessMsg;