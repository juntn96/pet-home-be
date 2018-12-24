import React,{Component} from 'react'
import { Card, CardBody, CardHeader, Col, Row,Table } from 'reactstrap';
import Spinner from '../../common/Spinner'
import LocationItem from './LocationItem'
import axios from 'axios';

class LocationAdmin extends Component {

  constructor(props){
    super(props);
    this.state = {
      userId : '',
      deletionFlag: false,
      locations : []
    }
  }

  componentDidMount(){
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
      })
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
                  style={{float:"right", width:"20%"}} 
                  placeholder="Tìm kiếm"
                  onChange={this.onSearch}
                  value={this.state.search}/>
              </CardHeader>
              <CardBody>
              { locations === null  ? <Spinner /> :
                <Table hover responsive >
                  <thead>
                  <tr>
                    <th>Tên</th>
                    <th>Địa chỉ</th>
                    <th>Mô tả</th>
                    <th>Loại</th>
                    <th>Đánh giá</th>
                    <th>Trạng thái</th>
                    <th>Xử lý</th>
                    <th></th>
                  </tr>
                  </thead>
                  <tbody ref="tableSearch">
                    { locations.map((item, index) =>
                      <LocationItem location={item} key={index}/>)}
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

export default LocationAdmin;

