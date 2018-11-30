import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import Spinner from '../common/Spinner';
import { Link } from 'react-router-dom';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  FormGroup,
  Label,
  Button
} from 'reactstrap';
class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: '',
      newPassword: '',
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.errors) {
      console.log(nextProps.errors)
      return { errors: nextProps.errors};
    }
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
    return (
      <div className="addProduct">
          <div className="row">
            <div className="col-md-8">           
              <Col xs="12" sm="12">
            <Card>
              <CardHeader>
                <strong>Thay đổi mật khẩu</strong>
              </CardHeader>
              <CardBody>
                <FormGroup>
                <div style={{width:'100%'}} className="alert alert-success" role="alert">Thay đổi thành công</div>
                <Col xs="6">
                  <Label htmlFor="company">Mật khẩu cũ</Label>
                  <input ref='oldValidate1'
                    type="text"
                    className={classnames('form-control form-control-lg')}
                    placeholder="Nhập mật khẩu cũ"
                    name="oldPassword"
                    value={this.state.oldPassword}
                    onChange={this.onChange}
                  />
                  <div style={{display:'block'}} ref='oldValidate' class="invalid-feedback"></div>
                  </Col>
                </FormGroup>
                <FormGroup>
                <Col xs="6">
                  <Label htmlFor="company">Mật khẩu mới</Label>
                  <input ref='new1Validate1'
                    type="text"
                    className={classnames('form-control form-control-lg')}
                    placeholder="Nhập mật khẩu mới"
                    name="newPassword1"
                    value={this.state.newPassword1}
                    onChange={this.onChange}
                  />
                  <div style={{display:'block'}} ref='new1Validate' class="invalid-feedback"></div>
                  </Col>
                </FormGroup>
                <FormGroup>
                <Col xs="6">
                  <Label htmlFor="company">Nhập lại mật khẩu mới</Label>
                  <input ref='newValidate1'
                    type="text"
                    className={classnames('form-control form-control-lg')}
                    placeholder="Nhập lại mật khẩu mới"
                    name="newPassword"
                    value={this.state.newPassword}
                    onChange={this.onChange}
                  />
                  <div style={{display:'block'}} ref='newValidate' class="invalid-feedback"></div>
                  </Col>
                </FormGroup>
                  <div style={{marginTop:20}}>
                  <FormGroup row className="my-0">
                    <Col col="3" sm="2" md="2" className="mb-3 mb-xl-0">
                      <Button style={{marginLeft:15}} block color="primary" onClick={this.onSubmit}>Lưu</Button>
                    </Col>
                    <Col col="3" sm="2" md="2" className="mb-xl-0">
                      <Button block color="secondary" onClick={this.onCancel}>Hủy</Button>
                    </Col>
                  </FormGroup>
                  </div>
              </CardBody>
            </Card>
          </Col>
            </div>
          </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, {  })(ChangePassword);