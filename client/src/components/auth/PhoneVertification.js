import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class PhoneVertification extends Component {
  constructor() {
    super();
    this.state = {
      phone: '',
      code: '',
      errors: {}
    };
  }

  onPhoneVertification = (e) => {
    e.preventDefault();
  }

  onChangePhoneNumber = (e) => {
    this.setState({phone: e.target.value});
  }

  onChangeCode = (e) => {
    this.setState({code: e.target.value});
  }

  render() {
    const { errors } = this.state;
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
              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Mã xác minh"
                  name="code"
                  value={this.state.code}
                  onChange={this.onChangeCode}/>
              </div>
              <Link to={{ pathname: '/register2', state: { phone: this.state.phone} }}>Tiếp tục</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PhoneVertification;
