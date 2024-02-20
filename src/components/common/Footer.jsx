import { useState, useEffect } from 'react';
import { Nav, Col, Row, Container } from 'react-bootstrap';
import {
  FaFacebook,
  FaXTwitter,
  FaLinkedin,
  FaInstagram,
} from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import tssurl from '../../port';

const Footer = () => {
  const [footerLinks, setFooterLinks] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`${tssurl}/footer`);
        const data = await res.json();
        setFooterLinks(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <footer>
      <Container>
        <Row>
          <Col md="2">
            <h4>Help Center</h4>
            {footerLinks?.footer?.QuickLinks?.slice(0, 4)?.map(
              (item, index) => (
                <h5 key={index}>
                  <Nav.Link to={item.page}>{item.Name}</Nav.Link>
                </h5>
              )
            )}
          </Col>
          <Col md="3">
            <h4>Shipping & Returns</h4>
            {footerLinks?.footer?.QuickLinks?.slice(4, 8)?.map(
              (item, index) => (
                <h5 key={index}>
                  <Nav.Link to={item.page}>{item.Name}</Nav.Link>
                </h5>
              )
            )}
          </Col>
          <Col md="2">
            <h4>About Us</h4>
            {footerLinks?.footer?.QuickLinks?.slice(8)?.map((item, index) => (
              <h5 key={index}>
                <Nav.Link to={item.page}>{item.Name}</Nav.Link>
              </h5>
            ))}
          </Col>
          <Col md="2"></Col>
          <Col md="3">
            <h4>Follow Us On Social Media</h4>
            {footerLinks?.footer && (
              <div className="social">
                <Link to={footerLinks.footer.facebook} target="_blank">
                  <FaFacebook size={30} />
                </Link>
                <Link to={footerLinks.footer.twitter} target="_blank">
                  <FaXTwitter size={30} />
                </Link>
                <Link to={footerLinks.footer.insta} target="_blank">
                  <FaInstagram size={30} />
                </Link>
                <Link to="." target="_blank">
                  <FaLinkedin size={30} />
                </Link>
              </div>
            )}
          </Col>
        </Row>
        <Row className="cpr">
          <p>{footerLinks?.footer?.footer}</p>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
