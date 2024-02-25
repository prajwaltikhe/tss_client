import { Row, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const tagData = [
  {
    text: '70% OFF* SELECTED STYLES - ',
    link: '/',
  },
  {
    text: '70% OFF* ALL BOOTS - ',
    link: '/',
  },
  {
    text: '$10 SELECTED PRODUCTS - ',
    link: '/',
  },
];

const Tags = () => {
  const repeatCount = 3;

  const repeatedTags = Array.from(
    { length: repeatCount },
    (_, index) => tagData[index % tagData.length]
  );

  return (
    <Container fluid className="tags">
      <Row className="scrolling-row">
        {repeatedTags.map((tag, index) => (
          <Col md="4" key={index}>
            <Link to={tag.link}>
              {tag.text}
              <span>SHOP NOW</span>
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Tags;
