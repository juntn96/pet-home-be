import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { registerUser } from '../../store/actions/authActions';
import { getLocationCategories } from '../../store/actions/locationAction';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Spinner from '../common/Spinner';
import { compose, withProps } from "recompose"
import SelectListGroup from './../common/SelectListGroup';
import { GoogleMap, withGoogleMap, Marker,withScriptjs } from "react-google-maps"

import {
  Row,
  Col
} from 'reactstrap'
const MyMapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDYAUQEfLuXk4u1A8ONB6BiLGCitBvFf3U&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: 21.029210, lng: 105.852470 }}
    onClick={props.onMapClick}
  >
  {<Marker position={props.getLatLong} />}
  </GoogleMap>
)
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
      address: [],
      locationCategories: []
    };
  }

  componentDidMount() {
    this.props.getLocationCategories();
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/product');
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
      address: [this.state.latlong,this.state.addressDetail],
      role: 1
    };
    this.props.registerUser(newUser, this.props.history);
  }
  getLatLong = (event) =>{
    var lat = event.latLng.lat(), long = event.latLng.lng();
    this.setState({
      latlong:{ lat:lat, lng:long}
    });
  }
  render() {
    const { errors } = this.state;
    const { locationCategories, loading } = this.props.locationApp;    
    return (
      <div className="register-form">
        <div className="container-register">
          <Row >
            <Col xs="6">
            <div className="card-form">
              <div className="register-form">
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
                  <input
                    type="text"
                    className={classnames('form-control form-control-lg', {
                      'is-invalid': errors.address
                    })}
                    placeholder="Địa chỉ chi tiết"
                    name="address"
                    value={this.state.addressDetail}
                    onChange={this.onChange}
                  />
                  {errors.address && (
                    <div className="invalid-feedback">{errors.address}</div>
                  )}
                </div>
                <div className="form-group">
                    { locationCategories === null || loading ? <Spinner /> :            
                      <SelectListGroup
                        placeholder="Loại địa điểm"
                        name="typeLocation"
                        value={this.state.typeLocation}
                        onChange={this.onChangeTypeLocation}
                        options={locationCategories}
                        error={errors.status}
                        info="Cho chúng tôi biết loại địa điểm bạn muốn tạo"
                      />
                    }
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" value="Đăng kí"/>
              </form>
              </div>
            </div>
            </Col>
            <Col xs="6">
              <div className="google-map">
              <MyMapComponent
                onMarkerClick={this.handleMarkerClick}
                onMapClick={this.getLatLong}
                getLatLong={this.state.address}
              />
              </div>
            </Col>
          </Row>
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
  locationApp: state.locationApp,
});

export default connect(mapStateToProps, { registerUser, getLocationCategories })(withRouter(Register));

