import { useState, useEffect } from "react";
import { Navbar, Nav, Container, Image } from "react-bootstrap";
import { NavDropdown, Tabs, Tab } from "react-bootstrap";
import { FaShoppingCart, FaStar, FaSearch, FaUser } from "react-icons/fa";
import axios from "axios";
import tssurl from "../../port";
import Login from "../auth/Login";
import { toast } from "react-toastify";

const Header = () => {
  const [logo, setLogo] = useState("");
  const [head, setHead] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);

  const isUserLoggedIn = () => {
    const authToken = localStorage.getItem("authToken");
    return !!authToken;
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
      console.error("Err:", error);
    }
  };

  useEffect(() => {
    fetchHeader();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("jwt");
    localStorage.removeItem("MID");
    setIsLoggedIn(false);
    toast.success("Sign Out Successful");
  };

  const activeKey = () => {
    const mainMenu = head?.find((menu) => menu?.Mname === "WOMEN");
    return mainMenu ? mainMenu.MLink : "";
  };
  console.log(head, "head");

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
      <Container className="navbar-tabs">
        {head && (
          <Tabs
            defaultActiveKey={activeKey}
            id="controlled-tab"
            className="mt-1"
          >
            {head.map((menu) => (
              <Tab key={menu.MLink} eventKey={menu.MLink} title={menu.Mname}>
                <Nav className="flex-row">
                  {menu?.nav_link?.map((item, index) => (
                    <Nav.Link
                      key={`${item?.link}-${index}`}
                      // href={`/products/${item.link}`}
                      style={{ fontSize: "1.1rem" }}
                    >
                      {item.name}
                    </Nav.Link>
                  ))}
                </Nav>
              </Tab>
            ))}
          </Tabs>
        )}
      </Container>
    </header>
  );
};

export default Header;
