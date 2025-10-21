import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MFA = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Validate OTP/TOTP
    navigate('/profile');
  };

  return (
    <div className="container-fluid p-0">
      <div className="row g-0" style={{ minHeight: '100vh' }}>

        {/* Left Side Image (70%) */}
        <div className="col-md-8 d-none d-md-block">
          <img
            src="https://wallpaperaccess.com/full/4839516.jpg"
            alt="MFA Illustration"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        {/* Right Side Form (30%) */}
        <div className="col-12 col-md-4 d-flex align-items-center justify-content-center">
          <div className="card p-4 shadow w-75">
            <h3 className="text-center mb-3">MFA Verification</h3>
            <p className="text-center text-muted">
              Enter the OTP sent to your email or phone
            </p>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                className="form-control mb-3"
                required
              />
              <button type="submit" className="btn btn-warning w-100">
                Verify
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default MFA;
