import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createProduct, getProductCategories } from '../../store/actions/productAction';
import { withRouter } from 'react-router-dom';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  FormGroup,
  Input,
  Label,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Button

} from 'reactstrap';

class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      desciption: '',
      price: 0,
      image: []
    };
}

  // componentDidMount() {
  //   this.props.getProductCategories();
  //   if (this.props.auth.isAuthenticated) {
  //     this.props.history.push('/product');
  //   }    
  // }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   if (nextProps.errors) {
  //     return { errors: nextProps.errors};
  //   }
  //   else return null;
  // }

  onChangeTypeProduct = (e) => {
    this.setState({typeLocation: e.target.value});
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = (e) => {
    e.preventDefault();

    const newProduct = {
      name: this.state.name,
      desciption: this.state.desciption,
      price: this.state.price,
      image: this.state.image
    };

    // this.props.createProduct(newProduct, this.props.history);
  }
  render() {
    const { errors } = this.state;
    // const { locationCategories, loading } = this.props.locationApp;    
    return (
      <div className="register">
          <div className="row">
            <div className="col-md-8">
              
              <Col xs="12" sm="12">
            <Card>
              <CardHeader>
                <strong>Add Product</strong>
              </CardHeader>
              <CardBody>
                <FormGroup>
                  <Label htmlFor="company">Tên sản phẩm</Label>
                  <Input type="text" id="company" placeholder="Nhập tên sản phẩm của bạn" />
                </FormGroup>
                <FormGroup row className="my-0">
                  <Col xs="6">
                  <Label htmlFor="vat">Giá</Label>
                  <div className="controls">
                      <InputGroup className="input-prepend">
                      <Input id="appendedPrependedInput" size="16" type="text" />
                      <InputGroupAddon addonType="append">
                        <InputGroupText>.00</InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                  </div>
                  </Col>
                </FormGroup>
                <FormGroup row className="my-0">
                  <Col xs="4">
                      <Label htmlFor="ccyear">Loại</Label>
                      <Input type="select" name="ccyear" id="ccyear">
                        <option>Đồ ăn</option>
                        <option>Dụng cụ vệ sinh</option>
                        <option>Thuốc</option>
                        <option>Đồ chơi cho thú nuôi</option>
                      </Input>
                    </Col>
                  </FormGroup>
                  <FormGroup row className="my-0">
                    <Col xs="7">
                      <Label htmlFor="textarea-input">Mô tả</Label>
                      <Input type="textarea" name="textarea-input" id="textarea-input" rows="7"
                             placeholder="Nội dung mô tả..." />
                    </Col>
                  </FormGroup>
                  <div style={{marginTop:20}}>
                  <FormGroup row className="my-0">
                    <Col col="6" sm="4" md="3" className="mb-3 mb-xl-0">
                      <Button block color="primary">Thêm sản phẩm</Button>
                    </Col>
                    <Col col="5" sm="4" md="2" className="mb-xl-0">
                      <Button block color="secondary">Hủy</Button>
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
  // errors: state.errors,
  // locationApp: state.locationApp,
});

// export default connect(mapStateToProps, { createProduct, getProductCategories })(withRouter(AddProduct));
export default connect(mapStateToProps)(withRouter(AddProduct));


