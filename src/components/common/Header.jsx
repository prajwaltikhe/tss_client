import { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Image, NavDropdown } from 'react-bootstrap';
import { FaShoppingCart, FaStar, FaSearch, FaUser } from 'react-icons/fa';
import axios from 'axios';
import tssurl from '../../port';
import Login from '../auth/Login';
import { toast } from 'react-toastify';

const Header = () => {
  const [logo, setLogo] = useState('');
  const [head, setHead] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  const isUserLoggedIn = () => {
    const authToken = localStorage.getItem('authToken');
    return authToken && authToken !== '';
  };

  useEffect(() => {
    setIsLoggedIn(isUserLoggedIn(true));
  }, []);

  const fetchHeader = async () => {
    try {
      const { data } = await axios.get(`${tssurl}/header`);
      setLogo(data.header.brand_logo.url);
      setHead(JSON.parse(data.header.header));
    } catch (error) {
      console.error('Err:', error);
    }
  };

  useEffect(() => {
    fetchHeader();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    toast.success('Sign Out Successfull');
  };
  return (
    <header>
      <Navbar expand="md" collapseOnSelect>
        <Container fluid>
          <Navbar.Brand href="/">
            <Image src={logo} alt="TSS" fluid />
          </Navbar.Brand>
          <Nav>
            <Nav.Link href="/products" className="px-3">
              <FaSearch size={15} />
            </Nav.Link>
            {isLoggedIn ? (
              <NavDropdown
                title={<FaUser size={15} />}
                id="basic-nav-dropdown"
                className="px-3"
              >
                <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                <NavDropdown.Item onClick={handleLogout}>
                  Sign Out
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link className="px-3">
                <Login data={show} handleShow={handleShow} />
              </Nav.Link>
            )}
            <Nav.Link href="/wishlist" className="px-3">
              <FaStar size={15} />
            </Nav.Link>
            <Nav.Link href="/cart/carts" className="px-3">
              <FaShoppingCart size={15} />
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Container fluid>
        <Nav className="menu">
          {head &&
            head.map((menu) => (
              <NavDropdown key={menu.MLink} title={menu.Mname} id={menu.MLink}>
                {menu.nav_link.map((item) => (
                  <NavDropdown.Item key={item.link} href={item.link}>
                    {item.name}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
            ))}
        </Nav>
      </Container>
    </header>
  );
};

export default Header;
