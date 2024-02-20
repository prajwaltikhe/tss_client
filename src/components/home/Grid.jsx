import { Container, Row, Col, Image } from 'react-bootstrap';

const Grid = ({ data }) => {
  return (
    <Container fluid className="grid">
      <h4>More To Explore</h4>
      <Row key={1}>
        <Col md={5}>
          <Image src={data?.image1?.url} fluid />
        </Col>
        <Col md={7}>
          <Image src={data?.image2?.url} fluid />
        </Col>
      </Row>
      <Row key={2}>
        <Col md={7}>
          <Image src={data?.image3?.url} fluid />
        </Col>
        <Col md={5}>
          <Image src={data?.image4?.url} fluid />
        </Col>
      </Row>
    </Container>
  );
};

export default Grid;
