import { Container, Row, Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Grid = ({ data }) => {
  return (
    <Container fluid className="grid">
      <h4>More To Explore</h4>
      <Row key={1}>
        <Col md={5}>
          <Image src={data?.image1?.url} fluid />
          <Link to={data?.link1}>
            <p className="gtitle">{data?.title1}</p>
          </Link>
        </Col>
        <Col md={7}>
          <Image src={data?.image2?.url} fluid />
          <Link to={data?.link2}>
            <p className="gtitle">{data?.title2}</p>
          </Link>
        </Col>
      </Row>
      <Row key={2}>
        <Col md={7}>
          <Image src={data?.image3?.url} fluid />
          <Link to={data?.link3}>
            <p className="gtitle">{data?.title3}</p>
          </Link>
        </Col>
        <Col md={5}>
          <Image src={data?.image4?.url} fluid />
          <Link to={data?.link4}>
            <p className="gtitle">{data?.title4}</p>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default Grid;
