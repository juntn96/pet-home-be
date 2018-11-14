import React, { Component } from 'react';
import { connect } from 'react-redux';

class AdminDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      files: [],
    };
  }

  onDrop = (files) => {
    
  }

  onPreviewDrop = (files) => {
    this.setState({
      files: this.state.files.concat(files),
    });
  }
  
  render() {
    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Admin Dashboard</h1>             
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(
  AdminDashboard
);
