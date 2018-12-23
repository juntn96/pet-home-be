import React, {Component} from 'react';
import { withRouter,Link } from 'react-router-dom';

class EditProfile extends Component {
  constructor(props){
    super();
    
  }
  componentDidMount(){

  }

  render(){
    return(
    <div>

    </div>);
  }
}
export default connect(mapStateToProps, { getProfile })(withRouter(EditProfile));