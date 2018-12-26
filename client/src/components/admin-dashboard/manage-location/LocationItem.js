import React,{Component} from 'react';
import { Badge, Button } from 'reactstrap';
import axios from 'axios';
class LocationItem extends Component {

  constructor(props){
    super(props);
    this.state = {
      deletionFlag: props.location.deletionFlag
    }
  }

  componentDidMount(){
  }

  _onClickUpdateLocation = () => {
    const location = this.props.location;
    const locationUpdate = {id: location._id,deletionFlag : !this.state.deletionFlag}
    axios.put('/api/admin/updateLocation', locationUpdate).then(res => {
      this._requestGetDelectionFlag();
    });
  }

  _requestGetDelectionFlag = () => {
    axios.get(`/api/admin/getLocationById//${this.props.location._id}`).then(res => {
      this.setState({
        deletionFlag: res.data.result.deletionFlag,
        isLoading: false
      })
    }).catch(err =>{
      //todo
    });
  }

  _onClickBanLocation = () => {
    this.setState({
      isLoading: true,
    })
    this._onClickUpdateLocation();
  }

  _showModal =() => {
    window.showReportDetail();
  }

  render(){
    const key = this.props.key;
    const { deletionFlag } = this.state
    const style = deletionFlag ? "secondary" : "danger";
    const text = deletionFlag ? "Không hoạt động" : "Đang hoạt động";
    const {location} = this.props;
    const maxRate = [];
    for(let i = 1 ;i<=5;i++){
      if(i <= location.systemRating){
        maxRate.push(1);
        
      }else if ((i) === location.systemRating+0.5){
        maxRate.push(0.5);
      }else{
        maxRate.push(0);
      }
    }
    console.log(maxRate)
    const date = new Date(location.updatedAt).toLocaleDateString() + ' ' + new Date(location.updatedAt).toLocaleTimeString();
    return (
      <tr key={key} style= {this.state.isLoading ?{opacity:0.4}:{opacity:1}} onClick={this._showModal}>
        <td style={{verticalAlign:"middle"}}>{location.name}</td>
        <td style={{verticalAlign:"middle"}}>{location.address}</td>
        <td style={{verticalAlign:"middle"}}>{location.description}</td>
        <td style={{verticalAlign:"middle"}}>{location.typeId.name}</td>
        <td style={{color:"orange"}}>{maxRate.map(item => item === 1? <i class="fas fa-star"></i>: (item === 0.5 ? <i class="fas fa-star-half-alt"></i>:<span style={{color:'#c8ced3'}}><i class="fas fa-star"></i></span>))}</td>
        <td style={{verticalAlign:"middle"}}><Badge color={style}>{text}</Badge></td>
        {/* <td style={{verticalAlign:"middle"}}>
        <div>{userDetail.appName}</div>
          <div className="small text-muted">Đăng ký lúc: {date}
          </div>
        </td>
        <td style={{verticalAlign:"middle"}}><Badge color={style}>{text}</Badge></td> */}
        {!this.state.deletionFlag?<td style={{verticalAlign:"middle"}}><Button color="success" size="sm" onClick={this._onClickBanLocation}>Ẩn</Button></td>
          :<td style={{verticalAlign:"middle"}}><Button color="warning" size="sm" onClick={this._onClickBanLocation}>Hiện</Button></td>}
          <td>Chi tiết</td>
      </tr>
    )
  }

}


export default LocationItem;

