import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactDropzone from "react-dropzone";

class Dashboard extends Component {
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
              <h1 className="display-4">Dashboard</h1>
              <ReactDropzone
                accept="image/*"
                onDrop={this.onPreviewDrop}
              >
                Drop an image, get a preview!
              </ReactDropzone>
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
  Dashboard
);
