import React, { Component } from 'react'
import { Card, CardBody, CardHeader, Col, Row, Table, Button } from 'reactstrap';
import Spinner from '../../common/Spinner'
import LocationItem from './LocationItem'
import axios from 'axios';
import Empty from '../../common/Empty';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
class LocationAdmin extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      locations: [],
      isLoading: true
    }
  }

  componentDidMount() {
    this._getAllLocations();
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  _getAllLocations = () => {
    axios.get('/api/admin/getLocation').then(res => {
      this.setState({
        locations: res.data.locations,
        isLoading: false
      });
    }).catch(err => {
      //todo
    });
  }

  onSearch = (e) => {
    if(this.state.locations.length !==0){
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
    }}
  }

  _onClickAddLocation = () => {
    this.props.history.push('/admin/location/add');
  }

  _onEdit = (item) => {
    this.props.history.push('/admin/location/edit', { data: item });
  }

  render() {
    const locations = this.state.locations;
    return (
      <div>
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Địa điểm
                <input type="text"
                  className="form-control"
                  style={{ float: "right", width: "20%" }}
                  placeholder="Tìm kiếm"
                  onChange={this.onSearch}
                  value={this.state.search} />
                <Button color="primary" style={{ float: "right", marginRight: 20 }} size="lg" onClick={this._onClickAddLocation}>Thêm địa điểm</Button>
              </CardHeader>
              <CardBody>
                {this.state.isLoading ? <Spinner /> : (locations.length === 0 ? <Empty /> :
                  <Table hover responsive >
                    <thead>
                      <tr>
                        <th style={{ width: '10%' }}>Tên</th>
                        <th style={{ width: '30%' }}>Địa chỉ</th>
                        <th style={{ width: '16%' }}>Mô tả</th>
                        <th style={{ width: '10%' }}>Loại</th>
                        <th style={{ width: '11%' }}>Đánh giá</th>
                        <th style={{ width: '9%' }}>Trạng thái</th>
                        <th style={{ width: '7%' }}>Xử lý</th>
                        <th style={{ width: '7%' }}></th>
                      </tr>
                    </thead>
                    <tbody ref="tableSearch">
                      {locations.map((item, index) =>
                        <LocationItem
                          location={item}
                          key={item._id}
                          user={this.props.auth.user}
                          onEdit={() => this._onEdit(item)}
                        />)}
                    </tbody>
                  </Table>)
                }
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>)
  }
}

// export default LocationAdmin;
const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(withRouter(LocationAdmin));
