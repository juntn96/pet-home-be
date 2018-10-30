import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { forgetPass } from '../../store/actions/authActions';
import Spinner from '../common/Spinner';

class ForgetPass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      errors: {},
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.sendPassStatus) {
      nextProps.history.push('/sendPassSuccess');
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.sendPassStatus) {
      prevProps.history.push('/sendPassSuccess');
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.forgetPass(this.state.phone);
  }

  

  render() {
    const { errors } = this.state;
    const { loading } = this.props.auth;   
    return (
      <div className="forgotPass">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <form noValidate onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames('form-control form-control-lg', {
                      'is-invalid': errors.message2
                    })}
                    placeholder="Số điện thoại của bạn"
                    name="phone"
                    value={this.state.phone}
                    onChange={this.onChange}
                  />
                  {errors.message2 &&  (
                    <div className="invalid-feedback">{errors.message2}</div>
                  )}
                </div>   
                { loading ? <Spinner /> : 
                <input type="submit" className="btn btn-info btn-block mt-4" value="Gửi"/>}
              </form>
            </div>
          </div>
        </div>
        </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  sendPassStatus: state.sendCodeBySMS.messageSendCode.status
});

export default connect(mapStateToProps, { forgetPass })(ForgetPass);