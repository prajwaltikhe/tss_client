import { useState } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import Sidebar from '../components/profile/Sidebar';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import tssurl from '../port';
import 'react-toastify/dist/ReactToastify.css';

const ChangePassword = () => {
  const [passwords, setPasswords] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords({
      ...passwords,
      [name]: value,
    });
  };

  const togglePasswordVisibility = (type) => {
    switch (type) {
      case 'oldPassword':
        setShowOldPassword(!showOldPassword);
        break;
      case 'newPassword':
        setShowNewPassword(!showNewPassword);
        break;
      case 'confirmPassword':
        setShowConfirmPassword(!showConfirmPassword);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const authToken = localStorage.getItem('authToken');
    console.log('authToeken', authToken);

    if (passwords.newPassword === passwords.confirmPassword) {
      try {
        const response = await fetch(`${tssurl}/auth/change-password`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            oldPassword: passwords.oldPassword,
            newPassword: passwords.newPassword,
            confirmPassword: passwords.confirmPassword,
            mid: 'your_mid_value',
          }),
        });
        console.log('response', response);
        if (response.ok) {
          console.log('Password changed successfully');
        } else {
          console.error('Failed to change password');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      alert('Passwords do not match');
    }

    setPasswords({
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  };

  return (
    <div>
      <Container>
        <Row>
          <Col md={3}>
            <Sidebar />
          </Col>
          <Col md={9} className="narrow-form-container">
            <form onSubmit={handleSubmit} className="narrow-form-container">
              <div className="form-group password-input">
                <label htmlFor="oldPassword">Old Password:</label>
                <input
                  type={showOldPassword ? 'text' : 'password'}
                  id="oldPassword"
                  name="oldPassword"
                  value={passwords.oldPassword}
                  onChange={handleChange}
                  required
                />
                <div
                  className="password-toggle"
                  onClick={() => togglePasswordVisibility('oldPassword')}
                >
                  {showOldPassword ? (
                    <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                  ) : (
                    <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                  )}
                </div>
              </div>
              <div className="form-group password-input">
                <label htmlFor="newPassword">New Password:</label>
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  id="newPassword"
                  name="newPassword"
                  value={passwords.newPassword}
                  onChange={handleChange}
                  required
                />
                <div
                  className="password-toggle"
                  onClick={() => togglePasswordVisibility('newPassword')}
                >
                  {showNewPassword ? (
                    <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                  ) : (
                    <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                  )}
                </div>
              </div>
              <div className="form-group password-input">
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={passwords.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <div
                  className="password-toggle"
                  onClick={() => togglePasswordVisibility('confirmPassword')}
                >
                  {showConfirmPassword ? (
                    <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                  ) : (
                    <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                  )}
                </div>
              </div>
              <button className="update-button" type="submit">
                Update
              </button>
            </form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ChangePassword;
