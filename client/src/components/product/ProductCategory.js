import React,{Component} from 'react';
import { connect } from 'react-redux';
import { createProductParentCategories, getProductParentCategories, updateProductCategory, deleteProductCategory } from '../../store/actions/productAction';
import {FormGroup, 
  InputGroup, 
  InputGroupAddon, 
  Input, 
  Card, 
  CardBody, 
  Col, 
  Row,
  CardHeader,
  Table,
  Button,
  FormText,
  Label,
  Badge
} from 'reactstrap';
import Spinner from '../common/Spinner';
import { withRouter} from 'react-router-dom';

class ProductCategory extends Component {

  constructor (props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      checkUpdate: false
    }
  }
  componentDidMount() {
    this.props.getProductParentCategories(this.props.auth.user.user_id); 
    this.setState(this.props.product.productParentCategories)
    const script = document.createElement("script");
    script.src = "https://use.typekit.net/foobar.js";
    script.async = true;
    document.body.appendChild(script);
  }
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }
  getPropertyCategory = (e) =>{
    e.preventDefault();
    this.setState({
      _id:e.currentTarget.getElementsByTagName('input')[0].value,
      name: e.currentTarget.getElementsByTagName('td')[0].innerText.trim(),
      description: e.currentTarget.getElementsByTagName('td')[1].innerText.trim(),
      checkUpdate: true
    });
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if(nextProps.product.productDetail.productDetail && prevState.isUpdate){

    }
  }
  // setDeletionFlagFalse = (e) =>{
  //   alert('aa');
  //   const newCategory = {
  //     id: this.state._id,
  //     deletionFlag : false
  //   };
  //   this.props.updateProductCategory(newCategory, this.props.history);
  //   this.setState(this.props.getProductParentCategories(this.props.auth.user.user_id));
  // }

  setDeletionFlagFalse = (e) =>{
    if(e.currentTarget.value===true)this.setState({deletionFlag : false})
    if(e.currentTarget.value===false)this.setState({deletionFlag : true});
    console.log(e.currentTarget.getElementsByTagName('input')[0].value,)
    const newCategory = {
      id: this.state._id,
      name: this.state.name,
      description: this.state.description,
      deletionFlag: false,
    };
    this.props.updateProductCategory(newCategory, this.props.history);
    this.setState(this.props.getProductParentCategories(this.props.auth.user.user_id));
  }
  cancelEdit = (e) => {
    this.setState({
      name: '',
      description: '',
      checkUpdate: false
    });
  }
  addCategory = (e) => {
    e.preventDefault();
    if (this.state.checkUpdate === false){
      const newCategory = {
        ownerId: this.props.auth.user.user_id,
        name: this.state.name,
        description: this.state.description,
        deletionFlag: false,
      };
      this.props.createProductParentCategories(newCategory, this.props.history);
      this.setState(this.props.getProductParentCategories(this.props.auth.user.user_id));
      this.cancelEdit()
    }else{
      const newCategory = {
        id: this.state._id,
        name: this.state.name,
        description: this.state.description
      };
      this.props.updateProductCategory(newCategory, this.props.history);
      this.setState(this.props.getProductParentCategories(this.props.auth.user.user_id));
      this.cancelEdit()
    }
    
  }
  renderRowItem = (item, index) => {
    return (
      <tr ref="rowCategory" key={index} onClick={this.getPropertyCategory}>
          <input type ="hidden" value={item._id}/>
          <td name="name">{item.name}</td>
          <td>{item.description}</td>
          {item.deletionFlag===false ?
            <td><Badge color="success">Đang hoạt động</Badge></td>:
            <td><Badge color="secondary">Đang bị ẩn</Badge></td>
          }
          <td><Button onClick={this.setDeletionFlagFalse} size="sm" ref="hideShowFlag" value={item.deletionFlag} color="warning" >
          {item.deletionFlag===false ? "Ẩn": "Hiện"}<input type ="hidden" value={item._id}/>
          </Button></td>
      </tr>
    );
  }
  onSearch =(e) => {
    let tr = this.refs.table.getElementsByTagName('tr');
    for (let i = 0; i < tr.length; i++) {
      let td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        if (td.innerHTML.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }     
    }
  }

  render() {
    const { productParentCategories , loading } = this.props.product;    
    return(
      <div>
        <Row>
          <Col xs="3" lg="3">
            <strong>Thêm thể loại</strong>
              <form onSubmit={this.addCategory}>
              <input type ="hidden" value={this.state._id}/>
              <FormGroup>
                <Label htmlFor="name">Tên thể loại</Label>
                <input type="text"  className="form-control" value={this.state.name} onChange={this.onChange} name="name" required="required" />
                <FormText className="help-block">Vui lòng nhập tên thể loại</FormText>
                </FormGroup>
                <FormGroup row className="my-0">
                <Col>
                  <Label htmlFor="description">Mô tả</Label>
                  <Input type="textarea" value={this.state.description} onChange={this.onChange} name="description" id="description" rows="4"/>
                  <FormText className="help-block">Nhập nội dung phần mô tả</FormText>
                </Col>
                </FormGroup>
                { this.state.checkUpdate===false ? <Button type="submit" color="info"><i className="fa fa-save"></i> Thêm mới</Button>:<div>
                <Button type="submit" color="info"><i className="fa fa-save"></i> Sửa</Button>
                <Button type="button" onClick={this.cancelEdit} color="secondary">Hủy</Button>
                </div>  }
              </form>
          </Col>
        <Col xs="7" lg="7">
            <Card>
            <CardHeader>
                <i className="fa fa-align-justify"></i> Danh sách thể loại
                <div style={{float: 'right'}}>
                  <Col sm="12">
                    <InputGroup>
                    <Input type="text" name="search" value={this.state.search}  onChange={this.onSearch} placeholder="Tìm thể loại" />
                    </InputGroup>
                    </Col>
                </div> 
            </CardHeader>
            <CardBody>
                <Table responsive>
                <thead>
                <tr>
                    <th>Tên</th>
                    <th>Mô tả</th>
                    <th>Trạng thái</th>
                    <th></th>
                </tr>
                </thead>
                <tbody ref="table">
                  { productParentCategories === null || loading ? <Spinner /> : 
                      productParentCategories.map((item, index) => this.renderRowItem(item,index))
                  }
                </tbody>
                </Table>
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
  product: state.product
});
  
export default connect(mapStateToProps, {createProductParentCategories, getProductParentCategories, updateProductCategory, deleteProductCategory  })(withRouter(ProductCategory));