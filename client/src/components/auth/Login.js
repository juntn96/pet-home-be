import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { loginUser } from '../../store/actions/authActions';
import { Link } from 'react-router-dom';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      phone: '',
      password: '',
      errors: {}
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      // this.props.history.push('/product');
      if(this.props.auth.user.role === 1){
        this.props.history.push('/product');
      } else {
        this.props.history.push('/admin');
      }
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.auth.isAuthenticated) {
        if(nextProps.auth.user.role === 1){
          nextProps.history.push('/product');
        } else {
          nextProps.history.push('/admin');
        }
    }

    if (nextProps.errors) {
      return { errors: nextProps.errors};
    }
    else return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.auth.isAuthenticated) {
      prevProps.history.push('/product');
    }
  }

  onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      phone: this.state.phone,
      password: this.state.password
    };
    this.props.loginUser(userData);
  }

  onForgetPass = (e) => {
    this.props.history.push('/forgetPass');;
  }

  onRegister = (e) => {
    this.props.history.push('/phoneVertification');;
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-1 mt-1">       
              <Link to="/" className="btn btn-lg btn-info mr-2">
                Home
              </Link>
            </div>
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Đăng nhập</h1>            
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames('form-control form-control-lg', {
                      'is-invalid': errors.phone
                    })}
                    placeholder="Số điện thoại"
                    name="phone"
                    value={this.state.phone}
                    onChange={this.onChange}
                  />
                  {errors.phone && (
                    <div className="invalid-feedback">{errors.phone}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames('form-control form-control-lg', {
                      'is-invalid': errors.message
                    })}
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                  {errors.message && (
                    <div className="invalid-feedback">{errors.message}</div>
                  )}
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" value="Đăng nhập" />
              </form>
              <button type="button" className="btn btn-info btn-block mt-4" onClick={this.onRegister}>Đăng kí</button>
              <button type="button" className="btn btn-info btn-block mt-4" onClick={this.onForgetPass}>Quên mật khẩu?</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(Login);
