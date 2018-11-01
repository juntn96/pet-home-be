import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createProduct, getProductCategories } from '../../store/actions/productAction';
import PropTypes from 'prop-types';
import { withRouter,Link } from 'react-router-dom';
import { Badge, Card, CardBody, CardHeader, Col, Pagination,Button, PaginationItem, PaginationLink, Row, Table, FormGroup, InputGroup, InputGroupAddon, Input } from 'reactstrap';

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

    this.props.createProduct(newProduct, this.props.history);
  }
  render() {
    return (
      <div className="product-container">   
        <FormGroup row>
            <Col sm="8">
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <Button type="button" color="primary" size="lg"><i className="fa fa-search"></i> Tìm kiếm</Button>
              </InputGroupAddon>
              <Input type="text" id="input1-group2" size="lg" name="input1-group2" placeholder="Tìm sản phẩm" />
            </InputGroup>
            </Col>
            <Link to="/product/add" className="btn btn-lg btn-primary"><i className="fa fa-plus">  Thêm sản phẩm</i></Link>
        </FormGroup>
        <Row>
        <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Danh sách sản phẩm
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead>
                  <tr>
                    <th>Ảnh</th>
                    <th>Tên Sản Phẩm</th>
                    <th>Giá</th>
                    <th>Loại</th>
                    <th style={{width:'9%'}}>Sửa sản phẩm</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td><img src={'assets/img/cho1.jpg'} style={{height:55,width:55}}  alt="image" /></td>
                    <td>Thức ăn cho chó</td>
                    <td>120.000</td>
                    
                    <td><Badge color="danger">Đồ ăn</Badge></td>

                    <td>
                      <Button color="success" size="sm">Sửa</Button>
                      <Button color="danger" size="sm"><i className="fa fa-trash"></i></Button>
                    </td>
                  </tr>
                  <tr>
                    <td><img src={'assets/img/cho3.jpg'} style={{height:55,width:55}}  alt="image" /></td>
                    <td>Đồ chơi cho chó</td>
                    <td>20.000</td>
                    <td><Badge color="secondary">Đồ chơ cho thú</Badge></td>
                    <td>
                      <Button color="success" size="sm">Sửa</Button>
                      <Button color="danger" size="sm"><i className="fa fa-trash"></i></Button>
                    </td>
                  </tr>
                  <tr>
                    <td><img src={'assets/img/cho2.jpg'} style={{height:55,width:55}}  alt="image" /></td>
                    <td>Thức ăn cho chó</td>
                    <td>120.000</td>
                    <td><Badge color="danger">Đồ ăn</Badge></td>
                    <td>
                    <Button color="success" size="sm">Sửa</Button>
                      <Button color="danger" size="sm"><i className="fa fa-trash"></i></Button>
                    </td>
                  </tr>
                  <tr>
                    <td><img src={'assets/img/meo2.jpg'} style={{height:55,width:55}}  alt="image" /></td>
                    <td>Đồ chơi cho mèo</td>
                    <td>45.000</td>
                    <td><Badge color="secondary">Đồ chơi cho thú</Badge></td>
                    <td>
                    <Button color="success" size="sm">Sửa</Button>
                      <Button color="danger" size="sm"><i className="fa fa-trash"></i></Button>
                    </td>
                  </tr>
                  <tr>
                    <td><img src={'assets/img/meo1.jpg'} style={{height:55,width:55}}  alt="image" /></td>
                    <td>Thuốc đau bụng</td>
                    <td>25.000</td>
                    <td><Badge color="primary">Thuốc</Badge></td>
                    <td>
                    <Button color="success" size="sm">Sửa</Button>
                      <Button color="danger" size="sm"><i className="fa fa-trash"></i></Button>
                    </td>
                  </tr>
                  </tbody>
                </Table>
                <Pagination>
                  <PaginationItem>
                    <PaginationLink previous tag="button"></PaginationLink>
                  </PaginationItem>
                  <PaginationItem active>
                    <PaginationLink tag="button">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink tag="button">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink tag="button">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink tag="button">4</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink next tag="button"></PaginationLink>
                  </PaginationItem>
                </Pagination>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

AddProduct.propTypes = {
  createProduct: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  locationApp: state.locationApp,
});

export default connect(mapStateToProps, { createProduct, getProductCategories })(withRouter(AddProduct));

