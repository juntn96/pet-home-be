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
import * as Constants from './../../utils/constants';
import Geosuggest from 'react-geosuggest';

import {
  Row,
  Col
} from 'reactstrap'

const MyMapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDZM7hoDN16cKoeHixvIrEyzEU-zlLzA10&v=3.exp&libraries=geometry,drawing,places",
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
      address: '',
      locationCategories: [],
      location:[]
    };
  }

  componentDidMount() {
    this.props.getLocationCategories(Constants.PRIVATE_LOCATION);
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
    const location =  {
      type: 'Point',
      coordinates: [this.state.latlong.lng,this.state.latlong.lat]
    }
    const newUser = {
      name: this.state.name,
      password: this.state.password,
      password2: this.state.password2,
      typeId: this.state.typeLocation,
      phoneNumber: phone,
      address: this.state.address,
      location:location,
      role: 1
    };
    this.props.registerUser(newUser, this.props.history);
  }

  getLatLong = (event) =>{    
    var lat = event.latLng.lat(), long = event.latLng.lng();
    this.setState({
      latlong:{
        lat:lat, lng:long
      }
    });

  }
  getLocationCenter =(suggest) => {
    if(suggest!== undefined){
      console.log(suggest.location);
      this.setState({location:suggest.location})
    }
  }
  render() {
    var fixtures = [
      {label: 'Old Elbe Tunnel, Hamburg', location: {lat: 53.5459, lng: 9.966576}},
      {label: 'Reeperbahn, Hamburg', location: {lat: 53.5495629, lng: 9.9625838}},
      {label: 'Alster, Hamburg', location: {lat: 53.5610398, lng: 10.0259135}}
    ];
    const { errors } = this.state;
    const { locationCategories, loading } = this.props.locationApp;    
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
      <div className="register-form">
        <div className="container-register" style={{marginTop: "8%"}}>
          <Row >
            <Col xs="6">
            <div className="card-form">           
              <div className="register-form" style={{padding: "10%"}}>
              <h3 style={{color:"black"}}>Đăng ký cửa hàng</h3>
              <br/>
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
                  {/* <input
                    type="text"
                    className={classnames('form-control form-control-lg', {
                      'is-invalid': errors.address
                    })}
                    placeholder="Địa chỉ chi tiết"
                    name="address"
                    value={this.state.address}
                    onChange={this.onChange}
                  /> */}

                  <Geosuggest className='form-control form-control-lg' onSuggestSelect={this.getLocationCenter} placeholder='Tên địa chỉ'/>
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
                <input type="submit" className="btn-lg btn-primary btn-block mt-4" value="Đăng kí"/>
              </form>
              
              </div>
            </div>
            </Col>
            <Col xs="6">
              <div className="google-map">
              <MyMapComponent
                onMarkerClick={this.handleMarkerClick}
                onMapClick={this.getLatLong}
                getLatLong={this.state.latlong}
              />
              </div>
            </Col>
          </Row>
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
  locationApp: state.locationApp,
});

export default connect(mapStateToProps, { registerUser, getLocationCategories })(withRouter(Register));

