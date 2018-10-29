import React, { Component } from 'react';
import CustomLink from '../common/CustomLink';
import { connect } from 'react-redux';
import { 
  getVertificationCode, 
  getVertify, 
  clearMessageSendCode, 
  clearmessageCheckCode,
  clearErrorsProps 
} from '../../store/actions/phoneActions';

class PhoneVertification extends Component {
  constructor() {
    super();
    this.state = {
      phone: '',
      code: '',
      errors: {},
    };
  }

  onPhoneVertification = (e) => {
    this.props.clearMessageSendCode();
    this.props.clearErrorsProps();
    this.props.getVertificationCode({phone: this.state.phone});
  }

  onPhoneVertify = (e) => {
    this.props.clearmessageCheckCode();
    this.props.clearErrorsProps();
    const { phone, code } = this.state;
    this.props.getVertify({phone, code});
  }

  onChangePhoneNumber = (e) => {
    this.setState({phone: e.target.value});
  }

  onChangeCode = (e) => {
    this.setState({code: e.target.value});
  }

  render() {
    const { errors } = this.state;
    const { messageSendCode, messageCheckCode, errorsProps } = this.props;
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Bước 1</h1>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Số điện thoại"
                  name="phone"
                  value={this.state.phone}
                  onChange={this.onChangePhoneNumber}
                />   
                {errors.name && (
                    <div className="invalid-feedback">{errors.name}</div>
                )}            
              </div>
              <div className="form-group">                  
                <button type="button" className="btn btn-info" onClick={this.onPhoneVertification}>Gửi mã xác minh</button>                  
              </div>
              { messageSendCode && messageSendCode.message !== undefined && (                      
                  <p className="font-weight-normal">{messageSendCode.message}</p>
              )}  
              { errorsProps && (
                  <p className="font-weight-normal">{errorsProps.message}</p>
              )}  
              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Mã xác minh"
                  name="code"
                  value={this.state.code}
                  onChange={this.onChangeCode}/>
              </div>
              <div className="form-group">                  
                <button type="button" className="btn btn-info" onClick={this.onPhoneVertify}>Xác nhận</button>
              </div>
              {messageCheckCode && messageCheckCode.message !== undefined && (                      
                <p className="font-weight-normal">{messageCheckCode.message}</p>
              )}  
              {errorsProps && (
                <p className="font-weight-normal">{errorsProps.message2}</p>
              )}

              {messageCheckCode && messageCheckCode.message !== undefined && (
                <CustomLink 
                  linkText={'Tiếp tục'}
                  phone={this.state.phone}
                />
              )}  
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errorsProps: state.errors,
  messageSendCode: state.sendCodeBySMS.messageSendCode,
  messageCheckCode: state.sendCodeBySMS.messageCheckCode,
});

export default connect(
  mapStateToProps, 
  { 
    getVertificationCode, 
    getVertify, 
    clearMessageSendCode, 
    clearmessageCheckCode,
    clearErrorsProps
  })(PhoneVertification);
