import React, { Component } from 'react';
import DisableLink from './../common/DisableLink';
import { connect } from 'react-redux';
import { getVertificationCode } from '../../actions/phoneActions';

class PhoneVertification extends Component {
  constructor() {
    super();
    this.state = {
      phone: '',
      code: '',
      errors: {},
      disable: false,
    };
  }

  onPhoneVertification = (e) => {
    this.props.getVertificationCode({phone: this.state.phone});
    console.log(this.props.errorsProps);
  }

  onChangePhoneNumber = (e) => {
    this.setState({phone: e.target.value});
  }

  onChangeCode = (e) => {
    this.setState({code: e.target.value});
  }

  render() {
    const { errors } = this.state;
    const { messageSendCode, errorsProps } = this.props;
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
                  { messageSendCode && messageSendCode.message !== undefined && (
                      
                      <p className="font-weight-normal">{messageSendCode.message}</p>
                  )}  
                  { errorsProps && (
                      <p className="font-weight-normal">{ errorsProps.message }</p>
                  )}  
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Mã xác minh"
                  name="code"
                  value={this.state.code}
                  onChange={this.onChangeCode}/>
              </div>
              <DisableLink 
                disable={this.state.disable}
                linkText={'Tiếp tục'}
                phone={this.state.phone}
                />
              {/* <Link to={{ pathname: '/register2', state: { phone: this.state.phone} }}>Tiếp tục</Link> */}
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
});

export default connect(mapStateToProps, { getVertificationCode })(PhoneVertification);
