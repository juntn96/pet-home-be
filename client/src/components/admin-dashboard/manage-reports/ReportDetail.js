import React,{Component} from 'react';
import axios from 'axios';

export default class ReportDetail extends Component {
  constructor(props){
    super(props);
    this.state = {
      loadingDetail: true,
    }
    console.log(this.props.location.state);
  }

  componentDidMount() {
    this._getDetailReport();
  }

  _getDetailReport = () => {
    axios.get(`/api/report/${this.props.location.state._id}`).then(res => {
      // console.log(res.data.result);
    }).catch(err =>{
      //todo
    });
  }
  
  render() {
    const imagesList = this.props.location.state.images.map(item => {return { src: item.url}}); 
    return (
      <div>
        <h1>HAHAHAH</h1>
      </div>
    )
  }
}