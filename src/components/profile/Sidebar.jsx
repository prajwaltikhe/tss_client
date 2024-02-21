import { useState, useEffect } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { BsChevronRight } from 'react-icons/bs';
import { useNavigate ,Link} from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(isUserLoggedIn());
  }, []);

  const isUserLoggedIn = () => {
    const authToken = localStorage.getItem('authToken');
    return authToken && authToken !== '';
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('MID');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <ListGroup className="sidebar">
      <Link to="/profile" className="sidebar-link text-decoration-none">
      <ListGroupItem className="sidebar-item">
        Profile
        <BsChevronRight />
      </ListGroupItem>
    </Link>
  <Link to="/changepassword" className="sidebar-link text-decoration-none">
      <ListGroupItem className="sidebar-item">
        Change Password
        <BsChevronRight />
      </ListGroupItem>
    </Link>
      <ListGroupItem className="sidebar-item">
        Orders
        <BsChevronRight />
      </ListGroupItem>
      <ListGroupItem className="sidebar-item">
        Payment Option
        <BsChevronRight />
      </ListGroupItem>
      <ListGroupItem className="sidebar-item">
        Reward Points
        <BsChevronRight />
      </ListGroupItem>
      <ListGroupItem className="sidebar-item">
        Contact Us
        <BsChevronRight />
      </ListGroupItem>
      {isLoggedIn ? (
        <ListGroupItem className="sidebar-item" onClick={handleLogout}>
          Log Out
          <BsChevronRight />
        </ListGroupItem>
      ) : (
        <ListGroupItem className="sidebar-item">
          Log In
          <BsChevronRight />
        </ListGroupItem>
      )}
    </ListGroup>
  );
};

export default Sidebar;
