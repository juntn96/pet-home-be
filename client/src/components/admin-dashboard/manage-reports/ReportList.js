import React, { Component } from 'react'
import { connect } from 'react-redux';
import Img from 'react-image';
import { withRouter } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import { getAllUsers } from '../../../store/actions/usersActions'
import Spinner from '../../common/Spinner'
import ReportItem from './ReportItem'
import axios from 'axios';
import Empty from '../../common/Empty';
import Lightbox from 'react-lightbox-component';
class ReportList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      deletionFlag: false,
      reports: [],
      detail: null,
      rqDetail: [],
      isLoading: true
    }
  }

  componentDidMount() {
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
    }).catch(err => {
      //todo
    });
  }

  onSearch = (e) => {
    let tr = this.refs.tableSearch.getElementsByTagName('tr');
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

  detailHandle = (obj) => {
    this.setState({ detail: obj.post, rqDetail: obj.allReport })
  }

  renderContent = () => {
    const imagesList = this.state.detail.images.map(item => {return { src: item.url}});
    return (
    <div>
      <div>{this.state.detail.title}</div>
      <br />
      {/* <div> */}
      {this.state.detail !== null ? 
        // this.state.detail.images.map(item =>
        // <Row>
        //   <Col xs="4" lg="4">
        //     <img src={item.url} style={{ height: 200, width: 200 }}>
        //     </img>
        //   </Col>
        // </Row>) 
        <Lightbox 
          images={imagesList}
          thumbnailWidth='150px'
          thumbnailHeight='150px'
          />
        : ''}
      {/* </div> */}
      
      <br />
      <small style={{ marginTop: 20 }} className="text-muted">Nội dung báo cáo:</small>
      {this.state.rqDetail.map(item => 
        <div>
          <div>
            <strong style={{ marginBottom: 20 }}>{item.reporterId.appName}</strong>
            <small className="text-muted" style={spanStyle}>{new Date(item.updatedAt).toDateString()}</small>
            <br />
            <span className="text-muted">{item.description}</span>
          </div>
        </div>)}
    </div>)
  }


  render() {
    const reports = this.state.reports;
    return (
      <div>
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Danh sách báo cáo
                <input type="text"
                  className="form-control"
                  style={{ float: "right", width: "20%" }}
                  placeholder="Tìm kiếm"
                  onChange={this.onSearch}
                  value={this.state.search} />
              </CardHeader>
              <CardBody>
                {this.state.isLoading ? <Spinner /> : (reports.length === 0 ? <Empty /> :
                  <Table hover responsive >
                    <thead>
                      <tr>
                        <th>Nội dung bài viết</th>
                        <th>Người viết</th>
                        <th>Ngày đăng</th>
                        <th>Số lần bị reports</th>
                        <th>Trạng thái</th>
                        <th style={{ width: '9%' }}>Xử lý người dùng này</th>
                        <th></th></tr>
                    </thead>
                    <tbody ref="tableSearch">
                      {reports.map((item, index) =>
                        item.postDetail.length !== 0 ? <ReportItem onShowDetail={this.detailHandle} reportDetail={item.postDetail[0]} index={index} totalReports={item.totalReport} /> : '')}
                    </tbody>
                  </Table>)
                }
              </CardBody>
            </Card>
          </Col>
        </Row>
        <div ref="" className="modal fade" id="showReportDetail" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h4> Chi tiết </h4>
              </div>
              <div className="modal-body">
                {this.state.detail !== null ? this.renderContent() : <Spinner />}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Ẩn</button>
              </div>
            </div>
          </div>
        </div>
      </div>)
  }

}
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  allusers: state.allusers
});

const spanStyle = {
  marginLeft: 10
}

export default connect(mapStateToProps, { getAllUsers })(withRouter(ReportList));

