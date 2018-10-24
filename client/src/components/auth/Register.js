import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import { getLocationCategories } from '../../actions/locationAction';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Spinner from '../common/Spinner';
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      password: '',
      password2: '',
      typeLocation: '',
      phone: '',
      errors: {},
      locationCategories: []
    };
}

  componentDidMount() {
    this.props.getLocationCategories();
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }    
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.errors) {
      return { errors: nextProps.errors};
    }
    else return null;
  }

  onChangeTypeLocation = (e) => {
    this.setState({typeLocation: e.target.value});
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { phone } = this.props.location.state;

    const newUser = {
      name: this.state.name,
      password: this.state.password,
      password2: this.state.password2,
      typeId: this.state.typeLocation,
      phoneNumber: phone,
      role: 1
    };

    this.props.registerUser(newUser, this.props.history);
  }

  renderOptionItem = (item, index) => {
    return (
      <option key={index} value={item._id}>{item.name}</option>
    );
  }

  render() {
    const { errors } = this.state;
    const { locationCategories, loading } = this.props.locationApp;    
    console.log(this.props);
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Bước 2</h1>
              <form noValidate onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames('form-control form-control-lg', {
                      'is-invalid': errors.name
                    })}
                    placeholder="Tên địa điểm"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChange}
                  />
                  {errors.name && (
                    <div className="invalid-feedback">{errors.name}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames('form-control form-control-lg', {
                      'is-invalid': errors.password
                    })}
                    placeholder="Mật khẩu"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames('form-control form-control-lg', {
                      'is-invalid': errors.password2
                    })}
                    placeholder="Xác nhận mật khẩu"
                    name="password2"
                    value={this.state.password2}
                    onChange={this.onChange}
                  />
                  {errors.password2 && (
                    <div className="invalid-feedback">{errors.password2}</div>
                  )}
                </div>
                <div className="form-group">
                  <label>                    
                    <p className="lead">Lựa chọn loại địa điểm:</p>  
                    { locationCategories === null ? <Spinner /> :            
                    <select className="form-control form-control-lg" onChange={this.onChangeTypeLocation}>
                      {locationCategories.map((item, index) => this.renderOptionItem(item,index))}
                    </select> }
                  </label>
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" value="Đăng kí"/>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  locationApp: state.locationApp
});

export default connect(mapStateToProps, { registerUser, getLocationCategories })(withRouter(Register));

