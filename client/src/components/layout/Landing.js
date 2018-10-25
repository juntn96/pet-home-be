import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Landing extends Component {
  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">Ngôi nhà của thú cưng</h1>                
                <Link to="/register" className="btn btn-lg btn-info mr-2">
                  Đăng kí
                </Link>
                <Link to="/login" className="btn btn-lg btn-light">
                  Đăng nhập
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
