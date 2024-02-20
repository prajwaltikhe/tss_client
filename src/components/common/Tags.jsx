import { Row, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Tags = () => {
  return (
    <Container fluid className="tags">
      <Row>
        <Col md="4">
          70% OFF* SELECTED STYLES - <Link to="/">SHOP NOW</Link>
        </Col>
        <Col md="4">
          70% OFF* ALL BOOTS - <Link to="/">SHOP NOW</Link>
        </Col>
        <Col md="4">
          $10 SELECTED PRODUCTS - <Link to="/">SHOP NOW</Link>
        </Col>
      </Row>
    </Container>
  );
};

export default Tags;
