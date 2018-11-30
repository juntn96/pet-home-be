import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  getProfile } from '../../store/actions/profileAction';
import { withRouter } from 'react-router-dom';
import {  Card, CardBody, CardHeader, Col, Row} from 'reactstrap';
import { compose, withProps } from "recompose"
import { GoogleMap, withGoogleMap, Marker,withScriptjs } from "react-google-maps"

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
  >
  {<Marker position={props.getLatLong} />}
  </GoogleMap>
)
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address:'' ,
      systemRating: null,
      location:  [],
      avatar: '',
      phoneNumber: null,
      role: null
    };
  }

  componentDidMount() {
    this.props.getProfile(this.props.auth.user.user_id)
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if(nextProps.profile.profile.locationProfile !== undefined ){
      console.log(nextProps.profile.profile.locationProfile )
      return {
        address: nextProps.profile.profile.locationProfile.address ,
        systemRating: nextProps.profile.profile.locationProfile.systemRating,
        location: nextProps.profile.profile.locationProfile.location ,
        avatar: nextProps.profile.profile.locationProfile.ownerId.avatar ,
        phoneNumber: nextProps.profile.profile.locationProfile.ownerId.phoneNumber ,
        role: nextProps.profile.profile.locationProfile.ownerId.role
      }
    }
    if (nextProps.errors) {
      return { errors: nextProps.errors};
    }else return null
  }
  render() {
    const profile = this.props.profile;
    console.log(profile)
    return (
      <div className="product-container">   
        <Row>
        <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Thông tin cá nhân
              </CardHeader>
              <CardBody>
              <div class="form-group row">
                <label for="staticEmail" class="col-sm-2 col-form-label">Địa chỉ</label>
                <div class="col-sm-10">
                <label for="staticEmail" class="col-sm-2 col-form-label">{this.state.address}</label>
                </div>
              </div>
              <div class="form-group row">
                <label for="staticEmail" class="col-sm-2 col-form-label">Số điện thoại</label>
                <div class="col-sm-10">
                <label for="staticEmail" class="col-sm-2 col-form-label">{this.state.phoneNumber}</label>
                </div>
              </div>
              <div class="form-group row">
                <label for="staticEmail" class="col-sm-2 col-form-label">Đánh giá</label>
                <div class="col-sm-10">
                <label for="staticEmail" class="col-sm-2 col-form-label">{this.state.systemRating}</label>
                </div>
              </div>
              <div class="form-group row">
                <label for="staticEmail" class="col-sm-2 col-form-label">Quyên</label>
                <div class="col-sm-10">
                <label for="staticEmail" class="col-sm-2 col-form-label">{this.state.role===1?'Quản lý địa điểm':'Người dùng'}</label>
                </div>
              </div>
              <div style={{width:600,height:370}}>
              <MyMapComponent
                getLatLong={{lat:this.state.location[0],lng:this.state.location[0]}}
              />
              </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  profile: state.profile
});

export default connect(mapStateToProps, { getProfile })(withRouter(Profile));

