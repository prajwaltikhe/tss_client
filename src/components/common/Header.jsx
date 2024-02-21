import { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Image, NavDropdown } from 'react-bootstrap';
import { FaShoppingCart, FaStar, FaSearch, FaUser } from 'react-icons/fa';
import axios from 'axios';
import tssurl from '../../port';
import Login from '../auth/Login';

const Header = ({ product }) => {
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
    setIsLoggedIn(isUserLoggedIn());
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
              <Nav.Link href="/profile" className="px-3">
                <FaUser size={15} />
              </Nav.Link>
            ) : (
              <Nav.Link className="px-3">
                <Login data={show} handleShow={handleShow} />
              </Nav.Link>
            )}
            <Nav.Link href="/wishlist" className="px-3">
              <FaStar size={15} />
            </Nav.Link>
            <Nav.Link href="/cart" className="px-3">
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
