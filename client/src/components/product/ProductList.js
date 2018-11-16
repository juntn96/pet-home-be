import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createProduct, getProductByIds, deleteProduct,getProductParentCategories } from '../../store/actions/productAction';
import PropTypes from 'prop-types';
import { withRouter,Link } from 'react-router-dom';
import { Badge, Card, CardBody, CardHeader, Col, Pagination,Button, PaginationItem, PaginationLink, Row, Table, FormGroup, InputGroup, InputGroupAddon, Input } from 'reactstrap';
import Img from 'react-image';
import Spinner from '../common/Spinner';

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

  componentDidMount() {
    this.props.getProductByIds(this.props.auth.user.user_id); 
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
  editProduct = (e) => {
    this.props.history.push('/product/edit',{id: e.currentTarget.getElementsByTagName('input')[0].value});
  }
  onAddProduct =(e) => {
    this.props.history.push('/product/add',{id: ''});
  }
  deleteProduct =(e) => {
    this.props.deleteProduct({id:e.currentTarget.getElementsByTagName('input')[0].value})
    this.setState(this.props.getProductByIds(this.props.auth.user.user_id));
  }
  renderProductItem = (item, index) => {
    return (
      <tr key={index}>
        <td><Img src={item.images[0]} style={{height:55,width:55}}/></td>
        <td>{item.name}</td>
        <td>{item.price}</td>
        { <td><Badge color="danger">Đồ ăn</Badge><span style={{display:'none'}}>{item.typeId}</span> </td>}
        <td>
          <Button color="success" size="sm" onClick={this.editProduct}><i className="fa fa-pencil-square-o"></i><input type="hidden" value={item._id}/></Button>
          <Button color="danger" size="sm" onClick={this.deleteProduct}><i className="fa fa-trash"></i><input type="hidden" value={item._id}/></Button>
        </td>
      </tr>
    );
  }
  renderOptionItem = (item, index) => {
    return (
      <option key={index} value={item._id}>{item.name}</option>
    );
  }
  onSearch =(e) => {
    let tr = this.refs.tableProduct.getElementsByTagName('tr');
    for (let i = 0; i < tr.length; i++) {
      let td = tr[i].getElementsByTagName("span")[1];
      console.log(td)
      console.log(e.target.value.trim())
      if (td) {
        if (td.innerHTML.toLowerCase().indexOf(e.target.value.trim()) > -1 || e.target.value==='all') {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }     
    }
  }

  render() {
    const { productByUserIds , productParentCategories,loading } = this.props.product; 
    return (
      <div className="product-container">   
        <FormGroup row>
            <Col sm="8">
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <Button type="button" color="primary" size="lg"><i className="fa fa-search"></i> Tìm kiếm</Button>
              </InputGroupAddon>
              { productParentCategories === null || loading ? <Input 
                  type="select" 
                  name="ccyear" 
                  id="ccyear"
                  >
                  <option value='all'>Tất cả</option>
                </Input> :   
                <Input 
                  type="select" 
                  name="ccyear" 
                  id="ccyear"
                  onClick={this.onSearch}
                  >
                  <option value='all'>Tất cả</option>
                  {productParentCategories.map((item, index) => this.renderOptionItem(item,index))}
                </Input>
                }
            </InputGroup>
            </Col>
            <Button onClick={this.onAddProduct} type="button" className="btn btn-lg btn-primary"><i className="fa fa-plus">  Thêm sản phẩm</i></Button>
        </FormGroup>
        <Row>
        <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Danh sách sản phẩm
              </CardHeader>
              <CardBody>
              { productByUserIds === null || loading ? <Spinner /> :
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
                  <tbody ref="tableProduct">
                    {productByUserIds.productByIds !== undefined && productByUserIds.productByIds.map((item, index) => this.renderProductItem(item,index))}
                  </tbody>
                </Table>
                }
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
  product: state.product,
});

export default connect(mapStateToProps, { createProduct, getProductByIds,deleteProduct,getProductParentCategories })(withRouter(AddProduct));

