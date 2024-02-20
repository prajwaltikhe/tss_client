import { Container, Row, Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const BestSellers = ({ data }) => {
  return (
    <Container fluid>
      <Row className="bestsellers">
        <h5>OUR BEST SELLERS HIGHLIGHTS</h5>
        {Array.isArray(data) &&
          data.map((card, index) => (
            <Col md={4} key={index}>
              <Image src={card.variants[0].ThumbImg[0]} fluid />
              <p>{card.product_name}</p>
              <Link to="/">Shop Now</Link>
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default BestSellers;
