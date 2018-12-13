import React,{Component} from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Row,Table } from 'reactstrap';
import {getAllUsers} from '../../../store/actions/usersActions'
import Spinner from '../../common/Spinner'
import LocationItem from './LocationItem'
import axios from 'axios';

class LocationAdmin extends Component {

  constructor(props){
    super(props);
    this.state = {
      userId : '',
      deletionFlag: false,
      reports : []
    }
  }

  componentDidMount(){
    this._getAllReports();
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  _getAllReports = () => {
    axios.get('/api/report/getReportedPost').then(res => {
      this.setState({
        reports: res.data.result,
        isLoading: false
      })
      console.log(res.data.result)
    }).catch(err =>{
      //todo
    });
  }

  onSearch =(e) => {
    let tr = this.refs.tableSearch.getElementsByTagName('tr');

    for (let i = 0; i < tr.length; i++) {
      let td = tr[i].getElementsByTagName("td")[1];
      if (td) {
        if (td.innerHTML.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }

  render(){
    const reports = this.state.reports;
    return (
    <div>
      <Row>
        <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Danh sách sản phẩm
                <input type="text" 
                  className="form-control" 
                  style={{float:"right", width:"20%"}} 
                  placeholder="Tìm kiếm"
                  onChange={this.onSearch}
                  value={this.state.search}/>
              </CardHeader>
              <CardBody>
              { reports === null  ? <Spinner /> :
                <Table hover responsive >
                  <thead>
                  <tr>
                    <th>Nội dung bài viết</th>
                    <th>Người viết</th>
                    <th>Ngày đăng</th>
                    <th>Số lần bị reports</th>
                    <th>Trạng thái</th>
                    <th style={{width:'9%'}}>Xử lý người dùng này</th>
                  </tr>
                  </thead>
                  <tbody ref="tableSearch">
                    { reports.map((item, index) =>
                      item.postDetail.length !==0 ? <LocationItem reportDetail={item.postDetail[0]} key={index} totalReports={item.totalReport}/>:'')}
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

export default connect(mapStateToProps, { getAllUsers})(withRouter(LocationAdmin));

