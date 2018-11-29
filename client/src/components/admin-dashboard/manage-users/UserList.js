import React,{Component} from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Badge, Card, CardBody, CardHeader, 
  Col, Button, PaginationItem, PaginationLink, Row, 
  Table, FormGroup, InputGroup, InputGroupAddon, Input } 
  from 'reactstrap';
import Img from 'react-image';
import {getAllUsers, banUserById} from '../../../store/actions/usersActions'
import Spinner from '../../common/Spinner'

class UserList extends Component {

  componentDidMount(){
    this.props.getAllUsers();
  }

  banUserById = (e) => {
    console.log(e.target.getElementsByTagName('input')[0].value)


  }

  renderProductItem = (item, index) => {
    return (
      <tr key={index}>
        <td><Img src={item.avatar} style={{height:55,width:55}}/></td>
        <td>{item.appName}</td>
        {item.deletionFlag?<td><Badge color="secondary">Không hoạt động</Badge></td>:<td><Badge color="danger">Đang hoạt động</Badge></td>}
        <td>
          <Button color="success" size="sm" onClick={this.banUserById}>Cấm/bỏ cấm<input type="hidden" value={item._id}/></Button>
        </td>
      </tr>
    );
  }
  render(){
    const users = this.props.allusers;
    return (
    <div>
      <Row>
        <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Danh sách sản phẩm
              </CardHeader>
              <CardBody>
              { users.allusers.users === undefined  ? <Spinner /> :
                <Table responsive>              
                  <thead>
                  <tr>
                    <th>Ảnh</th>
                    <th>Tên người dùng</th>
                    <th>Trạng thái hoạt động</th>
                    <th style={{width:'9%'}}>Xử lý</th>
                  </tr>
                  </thead>
                  <tbody>
                    {users.allusers.users !== undefined && users.allusers.users.map((item, index) => this.renderProductItem(item,index))}
                  </tbody>
                </Table>
                }
              </CardBody>
            </Card>
          </Col>
        </Row>
    </div>)
  }

}
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  allusers: state.allusers
});

export default connect(mapStateToProps, { getAllUsers, banUserById})(withRouter(UserList));

