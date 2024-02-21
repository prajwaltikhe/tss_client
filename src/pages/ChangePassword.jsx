import { useState } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import Sidebar from '../components/profile/Sidebar';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import axios from 'axios';
import tssurl from '../port';
import { toast } from 'react-toastify';
import ShopTags from '../components/common/Tags';
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
    const mid = localStorage.getItem('mID');

    if (passwords.newPassword === passwords.confirmPassword) {
      try {
        const response = await axios.post(
          `${tssurl}/auth/change-password`,
          {
            oldPassword: passwords.oldPassword,
            newPassword: passwords.newPassword,
            confirmPassword: passwords.confirmPassword,
            mid: mid,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        if (response.status === 200) {
          console.log('Password changed successfully');
          toast.success('Password changed successfully');
        } else {
          console.error('Failed to change password');
          toast.error('Failed to change password');
        }
      } catch (error) {
        console.error('Error:', error);
        toast.error('Error changing password');
      }
    } else {
      toast.error('Passwords do not match');
    }

    setPasswords({
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  };

  return (
    <Container fluid>
      <Row>
        <ShopTags />
      </Row>
      <p className="mx-5 my-3 fw-bold fs-4">My Account</p>
      <Row>
        <Col md={3}>
          <Sidebar />
        </Col>
        <Col md={9} className="narrow-form-container">
          <form
            onSubmit={handleSubmit}
            className="narrow-form-container"
            style={{ marginRight: '100px' }}
          >
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
  );
};

export default ChangePassword;
