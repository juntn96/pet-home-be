import React from 'react';
import { Link } from 'react-router-dom';

const SendPassSuccess = () => {
    return (
      <div className="forgotPass">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1>Mật khẩu mới đã được gửi tới số điện thoại của bạn!</h1>
              <Link style={{ textDecoration: 'none' }} to={{ pathname: '/login' }}>Quay về trang đăng nhập</Link>
            </div>
          </div>
        </div>
      </div>
    );
}

export default SendPassSuccess;